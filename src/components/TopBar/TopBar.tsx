import { AppBar, Container } from '@mui/material';
import type { ReactNode } from 'react';

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 1,
  py: 2,
};

const CustomAppBar = ({ children }: { children: ReactNode }) => {
  return (
    <AppBar color='secondary' sx={{ boxShadow: '0px 2px 15px -1px rgba(0, 0, 0, 0.2)' }}>
      <Container maxWidth='xl' sx={containerStyles}>
        {children}
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
