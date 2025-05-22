import AddNote from "@/components/AddNote/AddNote";
import Header from "@/components/Header"
import NoteList from "@/components/NoteList/NoteList"
import { useFetch } from "@/hooks/useFetch";
import type { NoteResponse } from "@/types";
import { Alert, Container, Grid, Skeleton } from "@mui/material"
import { useMemo, useState, type ChangeEvent } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const { data, loading, error, refetch } = useFetch<NoteResponse>("/notes");

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredNotes = useMemo(() => {
    return data?.notes?.filter(note =>
      (note?.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (note?.content ?? '').toLowerCase().includes(search.toLowerCase())
    ) ?? [];
  }, [data, search]);

  return (
    <Container maxWidth="xl">
      <Header search={search} onSearchChange={onSearchChange} />
      <AddNote onNoteCreate={refetch} />
      {loading ? (
        <Grid container spacing={2} mt={20} justifyContent="center">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Grid size={{ xs: 12, sm: 4 }} key={idx}>
              <Skeleton variant="rectangular" sx={{ borderRadius: "10px" }} width="100%" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error">
          An error occurred: {error.message || "Please try again!"}
        </Alert>
      ) : (
        <NoteList notes={filteredNotes} refetchNotes={refetch} />
      )}
    </Container>
  )
}

export default Home
