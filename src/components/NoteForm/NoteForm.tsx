import { useFormik, type FormikProps } from 'formik';
import { noteColors } from '@/fixtures';
import { validationNoteSchema } from '@/schemas'
import type { NoteFormValues } from '@/types';
import type { ReactNode } from 'react';

interface INoteFormProps {
  initialValues: NoteFormValues;
  onSubmit: (
    data: NoteFormValues,
    formikHelpers: {
      setFieldError: (field: string, message: string) => void;
      setStatus: (status: { apiError?: string }) => void;
      resetForm: () => void;
    }
  ) => Promise<void>;
  render: (formik: FormikProps<NoteFormValues>) => ReactNode;
}
const NoteForm = ({ initialValues, onSubmit, render }: INoteFormProps) => {
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
      {render(formik)}
    </form>
  );
};

export default NoteForm;
