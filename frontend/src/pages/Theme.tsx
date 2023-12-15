import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { usePaletteMode } from "../hooks/usePaletteMode";
import {
  amber,
  blue,
  blueGrey,
  deepOrange,
  grey,
  indigo,
  lightBlue,
  purple,
} from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

// テーマの型を拡張
declare module "@mui/material/styles" {
  interface Theme {
    layout: {
      drawerWidth: number;
      drawerMobileWidth: number;
    };
  }

  // このインターフェースを使用してテーマの型を拡張
  interface ThemeOptions {
    layout?: {
      drawerWidth?: number;
      drawerMobileWidth?: number;
    };
  }

  interface Palette {
    gradient: {
      primary: string;
    };
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  layout: {
    drawerWidth: 240,
    drawerMobileWidth: 56,
  },
  // palette: {
  // primary: {
  //   main: "#2196f3",
  // },
  // },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: blue[500],
          },
          divider: grey[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          gradient: {
            primary:
              "linear-gradient(to right, rgba(224, 64, 251, 0.1), rgba(33, 150, 243, 0.1))",
          },
        }
      : {
          primary: {
            main: blue[700],
          },
          secondary: {
            main: "#1A237E",
          },
          divider: grey[500],
          background: {
            default: "#1c2536",
            paper: "#1c2536",
          },
          text: {
            primary: "#fff",
            secondary: grey[300],
          },
          gradient: {
            primary:
              "linear-gradient(to right, rgba(224, 64, 251, 0.4), rgba(33, 150, 243, 0.4))",
          },
        }),
  },
});

export const Theme = ({ children }: { children: ReactNode }) => {
    const [paletteMode, setPaletteMode] = usePaletteMode();
    const [mode, setMode] = useState<PaletteMode>('dark');
  
    useEffect(() => {
      setMode(paletteMode === 'dark' ? 'dark' : 'light');
    }, [paletteMode]);
  
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  // その他のロジックとJSX
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
