import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import NoteCard from './NoteCard';
import '@testing-library/jest-dom';
import { mockNotesResponse } from '@/mocks/data';
import type { Note } from '@/types';

const mockRefetchNotes = vi.fn().mockResolvedValue(undefined);

const note: Note = mockNotesResponse[0];

describe('NoteCard', () => {
  it('Should renders note details correctly', () => {
    render(<NoteCard note={note} refetchNotes={mockRefetchNotes} isFetchloading={false} />);

    expect(screen.getByText(note.title)).toBeInTheDocument();
    expect(screen.getByText(note.content)).toBeInTheDocument();
  });

  it('Should opens delete confirmation dialog and deletes note', async () => {
    render(<NoteCard note={note} refetchNotes={mockRefetchNotes} isFetchloading={false} />);

    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByRole('button', { name: /delete/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockRefetchNotes).toHaveBeenCalled();
    });
  });

  it('opens update dialog on card click', async () => {
    render(<NoteCard note={note} refetchNotes={mockRefetchNotes} isFetchloading={false} />);
    const card = screen.getByText(note.title).closest('div');
    fireEvent.click(card!);
    await waitFor(() => {
      expect(screen.getByText(/update note/i)).toBeInTheDocument();
    });
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    const updateButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockRefetchNotes).toHaveBeenCalled();
    });
  });
});
