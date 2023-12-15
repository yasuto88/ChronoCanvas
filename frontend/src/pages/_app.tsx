import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "../styles/globals.css";
import Layout from "../components/layout";
import "@mui/joy/styles";
import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";

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
}

// カスタムテーマの設定
const theme = createTheme({
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
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
});

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
