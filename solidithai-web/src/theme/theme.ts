import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#123458',
      light: '#D4C9BE',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#030303',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px',
          '&:hover': {
            backgroundColor: '#234569',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#123458',
          '&:hover': {
            color: '#D4C9BE',
          },
        },
      },
    },
  },
}) 