import { createTheme } from '@mui/material/styles';

export const getTheme = (isDarkMode: boolean, isArabic: boolean) => createTheme({
  direction: isArabic ? 'rtl' : 'ltr',
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: '#2563eb', // Modern blue
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#ec4899', // Modern pink
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: isDarkMode ? '#0f172a' : '#f8fafc', // Modern dark navy / light gray
      paper: isDarkMode ? '#1e293b' : '#ffffff', // Modern darker navy / white
    },
    text: {
      primary: isDarkMode ? '#f1f5f9' : '#1e293b',
      secondary: isDarkMode ? '#94a3b8' : '#64748b',
    },
  },
  typography: {
    fontFamily: isArabic ? 'Arial, sans-serif' : 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      marginBottom: '1.5rem',
      fontSize: '2.2rem',
    },
    h6: {
      fontSize: '1.4rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1.15rem',
    },
    body2: {
      fontSize: '1.05rem',
    },
    caption: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.2rem',
    },
    subtitle2: {
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          backgroundImage: 'none',
        },
      },
      defaultProps: {
        elevation: 2,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '8px 24px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 8,
        },
        thumb: {
          height: 24,
          width: 24,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)',
          },
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 8,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          transition: 'all 0.6s ease-in-out',
        },
      },
    },
  },
});
