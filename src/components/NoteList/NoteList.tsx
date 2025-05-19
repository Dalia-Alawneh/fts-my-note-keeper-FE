import Grid from '@mui/material/Grid';
import NoteCard from "../NoteCard/NoteCard"
import { useFetch } from "@/hooks/useFetch"

const NoteList = () => {
  const { data, error, loading } = useFetch('/notes')

  return (
    <Grid container spacing={2} mt={20} display='flex' justifyContent='center'>
      {data?.notes?.map((note) => (
        <Grid item key={note._id}
          size={{ xs: 12, md: 3 }} md={4}>
          <NoteCard note={note} />
        </Grid>
      ))}
    </Grid>
  )
}

export default NoteList
