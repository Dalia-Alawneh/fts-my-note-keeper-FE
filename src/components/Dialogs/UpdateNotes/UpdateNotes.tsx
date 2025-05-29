import type { Note, NoteFormValues, NoteRequestPayload } from '@/types';
import AppDialog from '../Dialog';
import NoteForm from '../../NoteForm';
import ColorSelect from '../../Inputs/ColorSelect';
import { noteColors } from '@/fixtures';
import { Button, TextField } from '@mui/material';

interface IUpdateNoteDialogProps {
  open: boolean;
  handleClose: () => void;
  note: Note;
  handleUpdateSubmit: (
    data: NoteRequestPayload,
    formikHelpers: {
      setFieldError: (field: string, message: string) => void;
    },
  ) => Promise<void>;
  loading: boolean;
}
const UpdateNoteDialog = ({
  open,
  handleClose,
  note,
  handleUpdateSubmit,
  loading,
}: IUpdateNoteDialogProps) => {
  const initialValues: NoteFormValues = {
    title: note.title,
    content: note.content,
    color: note.color,
  };

  return (
    <AppDialog open={open} handleClose={handleClose}>
      <AppDialog.Title>Update Note</AppDialog.Title>
      <AppDialog.Content>
        <NoteForm
          initialValues={initialValues}
          onSubmit={handleUpdateSubmit}
          render={(formik) => (
            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                id='title'
                name='title'
                label='Title'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.title)}
                helperText={formik.errors.title}
                margin='normal'
              />

              <TextField
                fullWidth
                id='content'
                name='content'
                label='Content'
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.content)}
                helperText={formik.errors.content}
                margin='normal'
              />

              <ColorSelect
                colors={noteColors}
                labelId='color-label'
                id='color'
                name='color'
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.color && Boolean(formik.errors.color)}
                label='Color'
              />
              <AppDialog.Actions>
                <Button
                  color='primary'
                  variant='contained'
                  fullWidth
                  type='submit'
                  loading={loading}
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </AppDialog.Actions>
            </form>
          )}
        />
      </AppDialog.Content>
    </AppDialog>
  );
};

export default UpdateNoteDialog;
