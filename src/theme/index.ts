import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const commonOptions = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
    },
  },
};
export const lightTheme = responsiveFontSizes(
  createTheme({
    ...commonOptions,
    palette: {
      mode: 'light',
      primary: {
        main: '#c5aefe',
        '300': '#e6dff9',
      },
      secondary: {
        main: '#FFF',
      },
      text: {
        primary: '#2D2E2F',
        secondary: '#777B7E',
      },
    },
    noteColors: {
      yellow: '#FFF59D',
      pink: '#F48FB1',
      green: '#A5D6A7',
      blue: '#90CAF9',
      purple: '#CE93D8',
      orange: '#FFCC80',
      grey: '#D3D3D3',
    },
  }),
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    ...commonOptions,
    palette: {
      mode: 'dark',
      primary: {
        main: '#9b8bfe',
      },
      secondary: {
        main: '#212121',
      },
      background: {
        default: '#212121',
        paper: '#1E1E1E',
      },
      text: {
        primary: '#fff',
        secondary: '#eee',
      },
    },
    noteColors: {
      yellow: '#FBC02D',
      pink: '#F06292',
      green: '#66BB6A',
      blue: '#42A5F5',
      purple: '#AB47BC',
      orange: '#FFA726',
      grey: '#BDBDBD',
    },
  }),
);
