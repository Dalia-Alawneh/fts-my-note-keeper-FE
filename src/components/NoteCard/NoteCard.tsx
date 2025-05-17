import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

export default function NoteCard() {
  const theme = useTheme()

  return (
    <Card sx={{
      maxWidth: 400,
      boxShadow: '0 0 8px 5px rgba(238, 238, 238, 0.29)',
      backgroundColor: theme.noteColors.yellow,
      borderRadius: '12px'
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
    </Card>
  );
}
