import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomIconButton from '../IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SxProps, Theme } from '@mui/material/styles';
import { Box, Skeleton, Tooltip } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import formatDate from '@/utils/formatDate';
import type { Note, NoteRequestPayload, NoteResponse } from '@/types';
import Grow from '@mui/material/Grow';
import UpdateNoteDialog from '../Dialogs/UpdateNotes';
import { useState } from 'react';
import ConfirmDialog from '../Dialogs/ConfirmDelete';
import { useDelete } from '@/hooks/useDelete';
import toast from 'react-hot-toast';
import { getTextColor } from '@/utils';
import { usePut } from '@/hooks/usePut';

const cardStyles =
  (color?: string): SxProps<Theme> =>
  () => ({
    position: 'relative',
    boxShadow: '0 0 8px 5px rgba(238, 238, 238, 0.29)',
    backgroundColor: color,
    p: '10px',
    cursor: 'pointer',
    borderRadius: '12px',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    },
    '&:hover .hover-icon-btn': {
      opacity: 1,
    },
  });

const iconButtonStyles = {
  position: 'absolute',
  top: 8,
  right: 8,
  opacity: 0,
  transition: 'opacity 0.3s',
  color: '#555',
};

interface INoteCardProps {
  note: Note;
  refetchNotes: () => Promise<void>;
  isFetchloading: boolean;
}

export default function NoteCard({ note, refetchNotes, isFetchloading }: INoteCardProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { destroy, loading: isDeleting } = useDelete('/notes');
  const { put, loading: isUpdating } = usePut<NoteRequestPayload, NoteResponse>(
    `/notes/${note._id}`,
  );

  if (isFetchloading) {
    return (
      <Skeleton variant='rectangular' sx={{ borderRadius: '10px' }} width='100%' height={200} />
    );
  }
  const handleOpenUpdate = () => setIsUpdateOpen(true);
  const handleCloseUpdate = () => setIsUpdateOpen(false);

  const handleOpenDeleteConfirm = () => setIsDeleteConfirmOpen(true);
  const handleCloseDeleteConfirm = () => setIsDeleteConfirmOpen(false);

  const handleUpdateSubmit = async (
    data: NoteRequestPayload,
    formikHelpers: { setFieldError: (field: string, message: string) => void },
  ) => {
    try {
      const result = await put(data);
      if (result) {
        await refetchNotes();
        toast.success('Note updated successfully');
        handleCloseUpdate();
      }
    } catch (error) {
      const err = error as { fieldErrors?: Record<string, string>; message?: string };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, msg]) => {
          formikHelpers.setFieldError(field, msg);
        });
      } else {
        toast.error(err.message || 'Failed to update note');
      }
    }
  };
  const handleDelete = async () => {
    try {
      await destroy(note._id);
      toast.success('Note deleted');
      handleCloseDeleteConfirm();
      refetchNotes();
    } catch (err) {
      toast.error('Failed to delete note');
      console.error(err);
    }
  };

  return (
    <>
      <Grow in timeout={200} onClick={handleOpenUpdate}>
        <Card sx={cardStyles(note.color)}>
          <CardContent>
            <Typography
              gutterBottom
              color={getTextColor(note.color)}
              pb={1}
              variant='h5'
              fontWeight={500}
              component='div'
              borderBottom='1px solid grey'
            >
              {note.title}
            </Typography>
            <Typography variant='body2' sx={{ color: getTextColor(note.color) }}>
              {note.content}
            </Typography>
          </CardContent>
          <CustomIconButton
            aria-label='delete'
            className='hover-icon-btn'
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDeleteConfirm();
            }}
            sx={iconButtonStyles}
          >
            <DeleteIcon color='error' />
          </CustomIconButton>
          <Box display={'flex'} alignItems='center' gap={2} my={2} px={2}>
            <Tooltip title='Created At'>
              <CalendarMonth style={{ cursor: 'pointer' }} color='action' />
            </Tooltip>
            <Typography variant='body2' color={getTextColor(note.color)}>
              {formatDate(note.createdAt)}
            </Typography>
          </Box>
        </Card>
      </Grow>
      <UpdateNoteDialog
        handleClose={handleCloseUpdate}
        note={note}
        open={isUpdateOpen}
        handleUpdateSubmit={handleUpdateSubmit}
        loading={isUpdating}
      />
      <ConfirmDialog
        handleClose={handleCloseDeleteConfirm}
        open={isDeleteConfirmOpen}
        onConfirmDelete={handleDelete}
        loading={isDeleting}
      />
    </>
  );
}
