import { AppBar, Container } from "@mui/material";
import type { ReactNode } from "react";
const CustomAppBar = ({ children }: { children: ReactNode }) => {
  return (
    <AppBar color="primary">
      <Container maxWidth="xl">
        {children}
      </Container>
    </AppBar>
  )
}

export default CustomAppBar
