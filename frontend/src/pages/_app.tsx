import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "../styles/globals.css";
import Layout from "../components/layout";
import "@mui/joy/styles";

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
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* ThemeProviderでテーマを適用 */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
