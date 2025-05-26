import Grid from '@mui/material/Grid';
import NoteCard from '../NoteCard/NoteCard';
import type { Note } from '@/types';
interface INoteListProps {
  notes: Note[];
  refetchNotes: () => Promise<void>;
  loading: boolean;
}

const NoteList = ({ notes, refetchNotes, loading }: INoteListProps) => {
  return (
    <Grid container spacing={2} mt={10} display='flex' justifyContent='center'>
      {notes?.map((note) => (
        <Grid key={note._id} size={{ xs: 12, sm: 4 }}>
          <NoteCard note={note} refetchNotes={refetchNotes} isLoading={loading} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NoteList;
