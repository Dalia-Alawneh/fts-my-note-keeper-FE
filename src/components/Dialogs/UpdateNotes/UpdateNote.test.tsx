import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UpdateNoteDialog from './UpdateNotes';
import { noteColors } from '@/fixtures';
import type { Note } from '@/types';

const testNote: Note = {
  _id: '154',
  createdAt: '2025-05-23T07:03:58.482Z',
  title: 'Test Title',
  content: 'Test Content',
  color: noteColors.blue,
};

describe('Update Note Dialog', () => {
  it('Should render update note dialog when open prop true', () => {
    render(
      <UpdateNoteDialog
        open={true}
        handleClose={vi.fn()}
        loading={false}
        handleUpdateSubmit={vi.fn()}
        note={testNote}
      />,
    );
    expect(screen.getByText('Update Note')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
  });

  it('Should fill the form fields with note values', () => {
    render(
      <UpdateNoteDialog
        open={true}
        handleClose={vi.fn()}
        loading={false}
        handleUpdateSubmit={vi.fn()}
        note={testNote}
      />,
    );
    expect(screen.getByLabelText('Title')).toHaveValue('Test Title');
    expect(screen.getByLabelText('Content')).toHaveValue('Test Content');
  });

  it('Should call handleUpdateSubmit with form data on submit', async () => {
    const handleUpdateSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <UpdateNoteDialog
        open={true}
        handleClose={vi.fn()}
        loading={false}
        handleUpdateSubmit={handleUpdateSubmit}
        note={testNote}
      />,
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Updated Content' } });

    fireEvent.submit(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(handleUpdateSubmit).toHaveBeenCalledWith(
        {
          title: 'Updated Title',
          content: 'Updated Content',
          color: testNote.color,
        },
        expect.anything(),
      );
    });
  });

  it('Should show error if required fields are empty', async () => {
    render(
      <UpdateNoteDialog
        open={true}
        handleClose={vi.fn()}
        loading={false}
        handleUpdateSubmit={vi.fn()}
        note={testNote}
      />,
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: '' } });
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });
});
