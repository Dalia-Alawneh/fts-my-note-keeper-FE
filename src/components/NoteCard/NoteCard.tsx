import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import CustomIconButton from '../Shared/UI/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NoteCard() {
  const theme = useTheme()

  return (
    <Card sx={{
      position: 'relative',
      maxWidth: 350,
      boxShadow: '0 0 8px 5px rgba(238, 238, 238, 0.29)',
      backgroundColor: theme.noteColors.yellow,
      p: '10px',
      borderRadius: '12px',
      '&:hover .hover-icon-btn': {
        opacity: 1,
      },
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CustomIconButton aria-label="delete"
        className="hover-icon-btn"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          opacity: 0,
          transition: 'opacity 0.3s',
          color: '#555',
        }}>
        <DeleteIcon color='error' />
      </CustomIconButton>
    </Card>
  );
}
