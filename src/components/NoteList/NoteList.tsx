import Grid from '@mui/material/Grid';
import NoteCard from "../NoteCard/NoteCard"
import { useFetch } from "@/hooks/useFetch"
import type { NoteResponse } from '@/types';
import { Skeleton, Typography } from '@mui/material';

const NoteList = () => {
  const { data, error, loading } = useFetch<NoteResponse>('/notes')

  return (
    <Grid container spacing={2} mt={20} display='flex' justifyContent='center'>
      {
        !loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Skeleton variant="rectangular" width="100%" height={231} />
            </Grid>
          ))
        ) :

          (!data || data.notes.length === 0) ?
            <Typography>No data found</Typography>
            : data?.notes.map((note) => (
              <Grid item key={note._id} xs={12} md={4}>
                <NoteCard note={note} />
              </Grid>
            ))}
    </Grid>
  )
}

export default NoteList
