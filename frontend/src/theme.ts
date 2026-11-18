import { createTheme } from '@mui/material/styles';

// BikeSD brand purples, previously hard-coded in Header.tsx
const BRAND_PURPLE = '#483292';
const BRAND_PURPLE_DARK = '#2d1f4a';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#242424',
      paper: '#1a1a1a',
    },
    primary: {
      main: BRAND_PURPLE,
      dark: BRAND_PURPLE_DARK,
      contrastText: '#ffffff',
    },
    // Used for map markers: fatal incidents vs. injuries
    error: {
      main: '#dc3545',
    },
    warning: {
      main: '#ffc107',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: '#888888',
    },
    divider: '#444444',
    action: {
      hover: '#3a3a3a',
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.2em',
      lineHeight: 1.1,
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          height: '100%',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
        head: ({ theme }) => ({
          fontWeight: 700,
          fontSize: '20px',
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderTop: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
});
