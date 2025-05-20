import logo from "@/assets/logo2.png";
import { Box, Typography } from "@mui/material";
import CustomAppBar from "../AppBar";
import SearchInput from "../ui/Inputs/Search/Search";
const Header = () => {
  return (
    <CustomAppBar>
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
      <SearchInput />
    </CustomAppBar>
  )
}

export default Header
