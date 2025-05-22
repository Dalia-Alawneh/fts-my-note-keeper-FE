import type { Note, NoteFormValues, NoteRequestPayload, NoteResponse } from "@/types";
import AppDialog from "../Dialog"
import NoteForm from "../NoteForm";
import { usePUT } from "@/hooks/usePut";
import toast from "react-hot-toast";
import ColorSelect from "../ColorSelect";
import { noteColors } from "@/fixtures";
import { Button, TextField } from "@mui/material";

interface IUpdateNoteDialogProps {
  open: boolean;
  handleClose: () => void;
  note: Note;
  onNotesUpdate: () => Promise<void>;
}
const UpdateNoteDialog = ({ open, handleClose, note, onNotesUpdate }: IUpdateNoteDialogProps) => {
  const { put, loading } = usePUT<NoteRequestPayload, NoteResponse>(`/notes/${note._id}`);

  const handleSubmit = async (
    data: NoteRequestPayload,
    formikHelpers: { setFieldError: (field: string, message: string) => void }
  ) => {
    try {
      const result = await put(data);
      if (result) {
        await onNotesUpdate();
        toast.success("Note updated successfully");
        handleClose();
      }
    } catch (error) {
      const err = error as { fieldErrors?: Record<string, string>; message?: string };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, msg]) => {
          formikHelpers.setFieldError(field, msg);
        });
      } else {
        toast.error(err.message || "Failed to update note");
      }
    }
  };

  const initialValues: NoteFormValues = {
    title: note.title,
    content: note.content,
    color: note.color,
  };
  return (
    <AppDialog open={open} handleClose={handleClose}>
      <AppDialog.Title>
        Update Note
      </AppDialog.Title>
      <AppDialog.Content>
        <NoteForm initialValues={initialValues}
          onSubmit={handleSubmit}
          render={(formik) => (
            <>
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
              <AppDialog.Actions>
                <Button color="primary" variant="contained"
                  fullWidth type="submit"
                  loading={loading}
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </AppDialog.Actions>
            </>
          )}
        />
      </AppDialog.Content>
    </AppDialog>
  )
}

export default UpdateNoteDialog
