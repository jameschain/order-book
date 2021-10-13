import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: '#222222',
      paper: '#0D2232',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export default theme;
