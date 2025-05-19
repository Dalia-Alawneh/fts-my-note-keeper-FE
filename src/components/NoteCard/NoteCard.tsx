import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomIconButton from '../ui/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Theme } from '@mui/material/styles';
import { Box, Tooltip } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import formatDate from '@/utils/formatDate';

const cardStyles = (theme: Theme) => ({
  position: 'relative',
  boxShadow: '0 0 8px 5px rgba(238, 238, 238, 0.29)',
  backgroundColor: theme.noteColors.yellow,
  p: '10px',
  borderRadius: '12px',
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
  note: {
    title: string;
    content: string;
    createdAt: string;
  }
}
export default function NoteCard({ note }: INoteCardProps) {

  return (
    <Card sx={(theme: Theme) => cardStyles(theme)}>
      <CardContent>
        <Typography gutterBottom pb={1}
          variant="h5" component="div" borderBottom='1px solid grey'>
          {note.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {note.content}
        </Typography>
      </CardContent>
      <CustomIconButton aria-label="delete"
        className="hover-icon-btn"
        sx={iconButtonStyles}>
        <DeleteIcon color='error' />
      </CustomIconButton>
      <Box display={'flex'} alignItems='center' gap={2} my={2} px={2}>
        <Tooltip title="Created At">
          <CalendarMonth style={{ cursor: 'pointer' }} color='action' />
        </Tooltip>
        <Typography variant='body2'>{formatDate(note.createdAt)}</Typography>
      </Box>
    </Card>
  );
}
