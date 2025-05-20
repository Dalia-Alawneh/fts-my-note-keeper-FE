import Header from "@/components/Header"
import NoteList from "@/components/NoteList/NoteList"
import { Container } from "@mui/material"
import { useState, type ChangeEvent } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const onSearchChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }

  return (
    <Container maxWidth="xl">
      <Header search={search} onSearchChange={onSearchChange} />
      <NoteList search={search}/>
    </Container>
  )
}

export default Home
