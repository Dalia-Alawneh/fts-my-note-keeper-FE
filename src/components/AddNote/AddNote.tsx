import { Box, Button, Collapse, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import ColorSelect from "../ColorSelect";
import { noteColors } from "@/fixtures";
import { validationNoteSchema } from "@/schemas";
import { usePost } from "@/hooks/usePost";
import type { NoteRequestPayload } from "@/types";
import toast from "react-hot-toast";

interface NoteFormValues {
  title: string;
  content: string;
  color: string;
}

interface IAddNoteProps {
  onNoteCreate: () => Promise<void>
}
const AddNote = ({ onNoteCreate }: IAddNoteProps) => {
  const [expanded, setExpanded] = useState(false);
  const { post } = usePost<NoteRequestPayload>("/notes");

  const formik = useFormik<NoteFormValues>({
    initialValues: {
      title: "",
      content: "",
      color: noteColors.grey,
    },
    validationSchema: validationNoteSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        const result = await post(values);
        if (result) {
          toast.success("Note added successfully");
          resetForm();
          await onNoteCreate()
          setExpanded(false);
        }
      } catch (error) {
        const err = error as { fieldErrors?: Record<string, string>; message?: string };
        if (err.fieldErrors) {
          Object.entries(err.fieldErrors).forEach(([field, msg]) => {
            setFieldError(field, msg);
          });
        } else {
          toast.error(err.message || "Failed to add note");
        }
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setExpanded(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 20,
        cursor: expanded ? "default" : "text",
      }}
      onClick={() => {
        if (!expanded) setExpanded(true); // نفتح فقط إذا مش مفتوح
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box onClick={() => setExpanded(true)} sx={{ cursor: "text" }}>
          <Collapse in={expanded}>
            <TextField
              fullWidth
              variant="standard"
              id="title"
              name="title"
              placeholder="Title"
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
              variant="standard"
              id="content"
              name="content"
              placeholder="Take a note..."
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              minRows={3}
              sx={{ mb: 1 }}
              onFocus={() => setExpanded(true)}
            />

            <ColorSelect
              colors={noteColors}
              labelId="color-label"
              id="color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.color && Boolean(formik.errors.color)}
              label="Color"
              sx={{ mb: 1 }}
            />
          </Collapse>
        </Box>

        {expanded && (
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
              Add
            </Button>
          </Box>
        )}

        {!expanded && (
          <Box sx={{ color: "text.secondary", px: 1 }}>
            Take a note...
          </Box>
        )}
      </form>
    </Paper>
  );
};

export default AddNote;
