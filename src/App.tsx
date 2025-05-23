import { ThemeProvider } from '@emotion/react';
import Home from './views/Home/Home';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { Toaster } from 'react-hot-toast';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <Toaster position='top-right' reverseOrder={false} />
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
