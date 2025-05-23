import { Box, Button, Collapse, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import ColorSelect from '../ColorSelect';
import { noteColors } from '@/fixtures';
import { usePost } from '@/hooks/usePost';
import type { NoteFormValues, NoteRequestPayload } from '@/types';
import toast from 'react-hot-toast';
import NoteForm from '../NoteForm';

interface IAddNoteProps {
  onNoteCreate: () => Promise<void>;
}
const AddNote = ({ onNoteCreate }: IAddNoteProps) => {
  const [expanded, setExpanded] = useState(false);
  const { post, loading } = usePost<NoteRequestPayload>('/notes');
  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    color: noteColors.grey,
  };

  const handleSubmit = async (
    data: NoteFormValues,
    formikHelpers: {
      resetForm: () => void;
      setFieldError: (field: string, message: string) => void;
    },
  ) => {
    try {
      const result = await post(data);
      if (result) {
        toast.success('Note added successfully');
        formikHelpers.resetForm();
        await onNoteCreate();
        setExpanded(false);
      }
    } catch (error) {
      const err = error as { fieldErrors?: Record<string, string>; message?: string };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, msg]) => {
          formikHelpers.setFieldError(field, msg);
        });
      } else {
        toast.error(err.message || 'Failed to add note');
      }
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        maxWidth: 600,
        mx: 'auto',
        mt: 23,
      }}
      onClick={() => {
        if (!expanded) setExpanded(true);
      }}
    >
      <NoteForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={(formik) => (
          <form onSubmit={formik.handleSubmit} noValidate>
            <Box onClick={() => setExpanded(true)} sx={{ cursor: 'text' }}>
              <Collapse in={expanded}>
                <TextField
                  fullWidth
                  variant='standard'
                  id='title'
                  name='title'
                  placeholder='Title'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  sx={{ mb: 1 }}
                  autoFocus
                />

                <TextField
                  fullWidth
                  variant='standard'
                  id='content'
                  name='content'
                  placeholder='Take a note...'
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.content && Boolean(formik.errors.content)}
                  helperText={formik.touched.content && formik.errors.content}
                  multiline
                  minRows={3}
                  sx={{ mb: 1 }}
                  onFocus={() => setExpanded(true)}
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
                  sx={{ mb: 1 }}
                />
              </Collapse>
            </Box>
            {expanded && (
              <Box mt={2} display='flex' justifyContent='flex-end' gap={1}>
                <Button
                  type='button'
                  onClick={() => {
                    formik.resetForm();
                    setExpanded(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant='contained' type='submit' loading={loading}>
                  Add
                </Button>
              </Box>
            )}
          </form>
        )}
      />

      {!expanded && <Box sx={{ color: 'text.secondary', px: 1 }}>Take a note...</Box>}
    </Paper>
  );
};

export default AddNote;
