import { ThemeProvider } from '@emotion/react';
import Home from './views/Home/Home';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './theme';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
