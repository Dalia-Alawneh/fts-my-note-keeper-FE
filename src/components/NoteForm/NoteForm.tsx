import { useFormik } from 'formik';
import {
  TextField,
  Button
} from '@mui/material';
import ColorSelect from '../ColorSelect';
import { noteColors } from '@/fixtures';
import { validationNoteSchema } from '@/schemas'
import type { NoteRequestPayload } from '@/types';

interface INoteFormProps {
  initialValues: NoteRequestPayload;
  onSubmit: (
    data: NoteRequestPayload,
    formikHelpers: {
      setFieldError: (field: string, message: string) => void;
      setStatus: (status: { apiError?: string }) => void;
    }
  ) => Promise<void>;
  isLoading: boolean;
}
const NoteForm = ({ initialValues, onSubmit, isLoading }: INoteFormProps) => {
  const mappedInitialValues = {
    ...initialValues,
    color: initialValues.color || noteColors.grey,
  };

  const formik = useFormik({
    initialValues: mappedInitialValues,
    validationSchema: validationNoteSchema,
    onSubmit: (values, formikHelpers) => onSubmit(values, formikHelpers),
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.title)}
        helperText={formik.errors.title}
        margin="normal"
      />

      <TextField
        fullWidth
        id="content"
        name="content"
        label="Content"
        value={formik.values.content}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.content)}
        helperText={formik.errors.content}
        margin="normal"
      />

      <ColorSelect colors={noteColors} labelId="color-label"
        id="color"
        name="color"
        value={formik.values.color}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.color && Boolean(formik.errors.color)}
        label="Color" />

      <Button color="primary" variant="contained"
        fullWidth type="submit"
        loading={isLoading}
        sx={{ mt: 2 }}
      >
        Save
      </Button>
    </form>
  );
};

export default NoteForm;
