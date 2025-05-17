import { createTheme } from '@mui/material/styles';
import './types'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8D77FF',
    },
    secondary: {
      main: '#FFAF5F',
    },
    text: {
      primary: '#2D2E2F',
      secondary: '#777B7E',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  noteColors: {
    yellow: '#FFF59D',
    pink: '#F48FB1',
    green: '#A5D6A7',
    blue: '#90CAF9',
    purple: '#CE93D8',
    orange: '#FFCC80',
  }
});

export default theme;
