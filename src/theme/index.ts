import { createTheme } from '@mui/material/styles';
import './types'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c5aefe',
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
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
    }
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
