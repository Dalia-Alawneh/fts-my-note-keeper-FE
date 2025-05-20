import logo from "@/assets/logo2.png";
import { Box, Typography } from "@mui/material";
import CustomAppBar from "../AppBar";
import SearchInput from "../ui/Inputs/Search/Search";
import type { ChangeEvent } from "react";
interface IHeaderProps {
  search: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Header = ({ search, onSearchChange }: IHeaderProps) => {
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
      <SearchInput value={search} onChange={onSearchChange} />
    </CustomAppBar>
  )
}

export default Header
