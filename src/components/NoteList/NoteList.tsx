import Grid from '@mui/material/Grid';
import NoteCard from "../NoteCard/NoteCard"
import { useFetch } from "@/hooks/useFetch"
import type { NoteResponse } from '@/types';
import { Alert, Skeleton, Typography } from '@mui/material';
import { useMemo } from 'react';

interface INoteListProps {
  search: string;
}
const NoteList = ({ search }: INoteListProps) => {
  const { data, error, loading } = useFetch<NoteResponse>('/notes')

  const filteredNotes = useMemo(() => {
    return data?.notes?.filter(note =>
      (note?.title ?? '').toLowerCase().includes((search ?? '').toLowerCase()) ||
      (note?.content ?? '').toLowerCase().includes((search ?? '').toLowerCase())
    ) ?? [];
  }, [data, search]);

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
          (filteredNotes.length === 0) ?
            <Typography mt={5}>No data found</Typography>
            : filteredNotes?.map((note) => (
              <Grid key={note._id} size={{ xs: 12, sm: 4 }}>
                <NoteCard note={note} />
              </Grid>
            ))}
    </Grid>
  )
}

export default NoteList
