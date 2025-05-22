import { AppBar, Container } from "@mui/material"
import type { ReactNode } from "react"

const CustomAppBar = ({ children }: { children: ReactNode }) => {
  return (
    <AppBar color="secondary" sx={{ boxShadow: '0px 2px 15px -1px rgba(0, 0, 0, 0.2)' }}>
      <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>       
         {children}
      </Container>
    </AppBar>
  )
}

export default CustomAppBar
