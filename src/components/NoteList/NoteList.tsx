import Grid from '@mui/material/Grid';
import NoteCard from "../NoteCard/NoteCard"
import { useFetch } from "@/hooks/useFetch"
import type { NoteResponse } from '@/types';
import { Alert, Skeleton, Typography } from '@mui/material';

const NoteList = () => {
  const { data, error, loading } = useFetch<NoteResponse>('/notes')

  return (
    <Grid container spacing={2} mt={20} display='flex' justifyContent='center'>
      {
        loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Grid size={{ xs: 12, sm: 6 }} key={idx}>
              <Skeleton variant="rectangular" sx={{ borderRadius: "10px" }} width="100%" height={200} />
            </Grid>
          ))
        ) : error ? (
          <Grid size={12}>
            <Alert severity="error">
              An Error occurred {error.message || "Please try again!"}
            </Alert>
          </Grid>
        ) :
          (!data || data.notes.length === 0) ?
            <Typography>No data found</Typography>
            : data?.notes.map((note) => (
              <Grid key={note._id} size={{ xs: 12, sm: 6 }}>
                <NoteCard note={note} />
              </Grid>
            ))}
    </Grid>
  )
}

export default NoteList
