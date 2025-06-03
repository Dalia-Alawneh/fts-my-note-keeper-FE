import { useFormik, type FormikProps } from 'formik';
import { validationNoteSchema } from '@/schemas';
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
    },
  ) => Promise<void>;
  render: (formik: FormikProps<NoteFormValues>) => ReactNode;
}
const NoteForm = ({ initialValues, onSubmit, render }: INoteFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema: validationNoteSchema,
    onSubmit: (values, formikHelpers) => onSubmit(values, formikHelpers),
  });

  return render(formik);
};

export default NoteForm;
