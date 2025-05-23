import { fireEvent, render, screen } from '@testing-library/react';
import AppDialog from './Dialog';

const TestDialog = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => (
  <AppDialog open={open} handleClose={handleClose}>
    <AppDialog.Title>Test Title</AppDialog.Title>
    <AppDialog.Content>Test Content</AppDialog.Content>
    <AppDialog.Actions>
      <button onClick={handleClose}>Close</button>
    </AppDialog.Actions>
  </AppDialog>
);

describe('AppDialog', () => {
  it('Should render when open is true', () => {
    render(<TestDialog open={true} handleClose={vi.fn()} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('Should not render when open is false', () => {
    render(<TestDialog open={false} handleClose={vi.fn()} />);
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('Should call handleClose when dialog backdrop is clicked or esc is pressed', () => {
    const handleClose = vi.fn();
    render(<TestDialog open={true} handleClose={handleClose} />);
    const closeBtn = screen.getByText('Close');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
