import Grid from '@mui/material/Grid';
import NoteCard from "../NoteCard/NoteCard"
import type { Note } from '@/types';
interface INoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: INoteListProps) => {
  return (
    <Grid container spacing={2} mt={20} display='flex' justifyContent='center'>
      {notes?.map((note) => (
        <Grid key={note._id} size={{ xs: 12, sm: 4 }}>
          <NoteCard note={note} />
        </Grid>
      ))}
    </Grid>
  )
}

export default NoteList
