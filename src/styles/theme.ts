import { createTheme, responsiveFontSizes } from '@mui/material';
import type { Theme as ITheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module '@mui/material/Icon' {
  interface IconPropsColorOverrides {
    tertiary: true;
  }
}

export const theme: ITheme = responsiveFontSizes(
  createTheme({
    palette: {
      secondary: {
        main: '#3f51b5',
        light: '#6573c3',
        dark: '#0a0a0a',
      },
      primary: {
        main: '#0a0a0a',
        light: '#0a0a0a',
        dark: '#0a0a0a',
        contrastText: '#fff',
      },

      tertiary: {
        main: '#007bb2',
        light: '#007bb2',
        dark: '#007bb2',
      },
      background: {
        default: '#ffffff',
      },
      error: {
        main: '#D16947',
        light: '#D16947',
        dark: '#D16947',
      },
      warning: {
        main: '#D7A340',
        light: '#D7A340',
        dark: '#D7A340',
      },
      info: {
        main: '#88A5D4',
        light: '#88A5D4',
        dark: '#88A5D4',
      },
      success: {
        main: '#51A087',
        light: '#6BBEA6',
        dark: '#51A087',
      },
    },
    // shape: {
    //   borderRadius: 0,
    // },
    // components: {
    //   // Name of the component
    //   MuiTextField: {
    //     styleOverrides: {
    //       // Name of the slot
    //       root: {
    //         backgroundColor: '#FFFF',
    //         '&:hover': {
    //           backgroundColor: 'rgb(250, 232, 241)',
    //           // Reset on touch devices, it doesn't add specificity
    //           '@media (hover: none)': {
    //             backgroundColor: 'rgb(232, 241, 250)',
    //           },
    //         },
    //         '&.Mui-focused': {
    //           backgroundColor: 'rgb(250, 241, 232)',
    //         },
    //         '&:-webkit-autofill': {
    //           backgroundColor: '#FFFF',
    //           '-webkit-box-shadow': '0 0 0 100px #000 inset',
    //           '-webkit-text-fill-color': '#fff',
    //         },
    //       },
    //     },
    //   },
    // },

    typography: {
      fontFamily: 'Roboto',
      fontSize: 16,
      button: {
        fontFamily: 'Roboto',
      },
      body1: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '20px',
      },
      body2: {
        fontFamily: 'Roboto',
        fontSize: 14,
        lineHeight: '18px',
      },
      subtitle1: {
        fontFamily: 'Roboto',
        lineHeight: 1.5,
        fontWeight: 500,
        fontSize: 17,
      },
      subtitle2: {
        fontFamily: 'Roboto',
        fontSize: 15,
        lineHeight: 1.2,
      },
      caption: {
        fontFamily: 'Roboto',
        fontSize: 12,
        lineHeight: 1,
      },
      overline: {
        fontFamily: 'Roboto',
        fontSize: 10,
      },
      h1: {
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 21,
      },
      h2: {
        fontFamily: 'Roboto',
        fontSize: 52,
      },
      h3: {
        fontFamily: 'Roboto',
      },
      h4: {
        fontFamily: 'Roboto',
        fontSize: 44,
      },
      h5: {
        fontFamily: 'Roboto',
        fontSize: 36,
        lineHeight: 1.125,
      },
      h6: {
        fontFamily: 'Roboto',
        fontSize: 25,
        lineHeight: 1.125,
      },
    },
  })
);
