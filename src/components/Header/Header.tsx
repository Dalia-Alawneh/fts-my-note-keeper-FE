import logo from "@/assets/logo2.png";
import { AppBar, Box, Container, Typography } from "@mui/material";
const Header = () => {
  return (
    <AppBar color="primary" >
      <Container maxWidth="xl">
        <Box
          component="header"
          display="flex"
          alignItems="center"
          gap={2}
          p={2}
        >
          <img width='60px' src={logo} alt="Note Keeper" />
          <Typography variant="h1">My Note Keeper</Typography>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
