declare module '@mui/material/styles' {
  interface Theme {
    noteColors: { [k: string]: string };
  }

  interface ThemeOptions {
    noteColors?: { [k: string]: string };
  }
}
