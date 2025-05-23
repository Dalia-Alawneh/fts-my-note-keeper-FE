import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmDeleteDialog from './ConfirmDelete';

describe('Confirm Delete Dialog', () => {
  it('Should render confirm delete dialog when open prop true', () => {
    render(
      <ConfirmDeleteDialog
        open={true}
        handleClose={vi.fn()}
        loading={false}
        onConfirmDelete={vi.fn()}
      />,
    );
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('Should call onConfirmDelete when click on delete button', () => {
    const onConfirmDelete = vi.fn();
    render(
      <ConfirmDeleteDialog
        open={true}
        handleClose={vi.fn()}
        loading={false}
        onConfirmDelete={onConfirmDelete}
      />,
    );
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    expect(onConfirmDelete).toHaveBeenCalled();
  });

  it('Should display loading spinner when click on delete button', () => {
    const onConfirmDelete = vi.fn();
    render(
      <ConfirmDeleteDialog
        open={true}
        handleClose={vi.fn()}
        loading={false}
        onConfirmDelete={onConfirmDelete}
      />,
    );
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    const loadingWrapper = deleteButton.querySelector('.MuiButton-loadingWrapper');
    expect(loadingWrapper).toBeInTheDocument();
    expect(loadingWrapper).not.toHaveStyle('display: none');
  });
});
