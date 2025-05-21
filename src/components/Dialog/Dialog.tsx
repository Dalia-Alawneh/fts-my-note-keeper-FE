import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { type DialogProps } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { type ReactNode } from 'react';

interface IAppDialogProps extends DialogProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode
}
function AppDialogComponent({ open, handleClose, children, ...rest }: IAppDialogProps) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      {...rest}
    >
      {children}
    </Dialog>
  );
}

const Title = ({ children }: { children: ReactNode }) => (
  <DialogTitle id="alert-dialog-title">{children}</DialogTitle>
)

const Content = ({ children }: { children: ReactNode }) => (
  <DialogContent id="alert-dialog-title">{children}</DialogContent>
)

const Actions = ({ actions }: { actions: ReactNode }) => (
  <DialogActions id="alert-dialog-title">{actions}</DialogActions>
)


AppDialogComponent.Title = Title;
AppDialogComponent.Content = Content;
AppDialogComponent.Actions = Actions;

interface ICompoundAppDialog extends React.FC<IAppDialogProps> {
  Title: typeof Title;
  Content: typeof Content;
  Actions: typeof Actions;
}
const AppDialog = AppDialogComponent as ICompoundAppDialog;

export default AppDialog