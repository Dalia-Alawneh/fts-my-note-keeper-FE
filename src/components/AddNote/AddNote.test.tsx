import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddNote from './AddNote';

describe('Add Note', () => {
  it('Should add a note', async () => {
    const mockOnNoteCreate = vi.fn().mockResolvedValue(undefined);
    render(<AddNote onNoteCreate={mockOnNoteCreate} />);
    const paper = screen.getByText(/take a note/i);
    fireEvent.click(paper);

    const titleInput = screen.getByPlaceholderText(/title/i) as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText(/take a note.../i) as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Test title' } });
    fireEvent.change(contentInput, { target: { value: 'Test content' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(mockOnNoteCreate).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(contentInput.value).toBe('');
    });
  });
});
