import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomIconButton from '../ui/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Theme } from '@mui/material/styles';

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
  }
}
export default function NoteCard({ note }: INoteCardProps) {

  return (
    <Card sx={(theme: Theme) => cardStyles(theme)}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
    </Card>
  );
}
