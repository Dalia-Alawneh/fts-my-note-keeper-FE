import AddNote from '@/components/AddNote/AddNote';
import Header from '@/components/Header';
import NoteList from '@/components/NoteList/NoteList';
import { useFetch } from '@/hooks/useFetch';
import type { NoteResponse } from '@/types';
import { Alert, Container } from '@mui/material';
import { useMemo, useState, type ChangeEvent } from 'react';

const Home = () => {
  const [search, setSearch] = useState('');
  const { data, loading, error, refetch } = useFetch<NoteResponse>('/notes');

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredNotes = useMemo(() => {
    return (
      data?.notes?.filter(
        (note) =>
          (note?.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
          (note?.content ?? '').toLowerCase().includes(search.toLowerCase()),
      ) ?? []
    );
  }, [data, search]);

  return (
    <Container maxWidth='xl'>
      <Header search={search} onSearchChange={onSearchChange} />
      <AddNote onNoteCreate={refetch} />
      {error ? (
        <Alert severity='error' sx={{ my: 3 }}>
          An error occurred: {error.message || 'Please try again!'}
        </Alert>
      ) : (
        <NoteList notes={filteredNotes} refetchNotes={refetch} loading={loading} />
      )}
    </Container>
  );
};

export default Home;
