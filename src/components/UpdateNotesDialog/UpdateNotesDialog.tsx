import type { Note, NoteRequestPayload, NoteResponse } from "@/types";
import AppDialog from "../Dialog"
import NoteForm from "../NoteForm";
import { usePUT } from "@/hooks/usePut";
import toast from "react-hot-toast";

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

  const initialValues: NoteRequestPayload = {
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
          isLoading={loading} />
      </AppDialog.Content>
    </AppDialog>
  )
}

export default UpdateNoteDialog
