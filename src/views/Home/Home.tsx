import Header from "@/components/Header"
import NoteList from "@/components/NoteList/NoteList"
import { Container } from "@mui/material"

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Header />
      <NoteList/>
    </Container>
  )
}

export default Home
