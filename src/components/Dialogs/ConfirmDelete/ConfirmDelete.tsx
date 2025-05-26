import { Button } from '@mui/material';
import AppDialog from '../Dialog';

interface IConfirmDialogProps {
  open: boolean;
  handleClose: () => void;
  onConfirmDelete: () => void;
  loading: boolean;
}

const ConfirmDeleteDialog = ({
  open,
  handleClose,
  onConfirmDelete,
  loading,
}: IConfirmDialogProps) => {
  return (
    <AppDialog open={open} handleClose={handleClose}>
      <AppDialog.Title>Confirm Delete</AppDialog.Title>
      <AppDialog.Content>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </AppDialog.Content>
      <AppDialog.Actions>
        <Button color='info' variant='outlined' type='button' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          data-testid='delete-note'
          color='error'
          variant='contained'
          onClick={onConfirmDelete}
          loading={loading}
        >
          Delete
        </Button>
      </AppDialog.Actions>
    </AppDialog>
  );
};

export default ConfirmDeleteDialog;
