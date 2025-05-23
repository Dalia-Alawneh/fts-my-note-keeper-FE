import { fireEvent, render, screen } from '@testing-library/react';
import ColorSelect from './ColorSelect';
import { noteColors } from '@/fixtures';

describe('Color select input', () => {
  it('Should renders all color options', async () => {
    render(<ColorSelect colors={noteColors} value='' onChange={() => {}} />);

    const selectInput = await screen.findByRole('combobox');
    fireEvent.mouseDown(selectInput);

    Object.keys(noteColors).forEach((colorName) => {
      expect(screen.getByText(colorName)).toBeInTheDocument();
    });
  });

  it('Should calls onChange when a color is selected', async () => {
    const handleChange = vi.fn();
    render(<ColorSelect colors={noteColors} value='' onChange={handleChange} />);

    const selectInput = await screen.findByRole('combobox');
    fireEvent.mouseDown(selectInput);

    const firstColor = Object.keys(noteColors)[0];
    fireEvent.click(screen.getByText(firstColor));

    expect(handleChange).toHaveBeenCalled();
  });
});
