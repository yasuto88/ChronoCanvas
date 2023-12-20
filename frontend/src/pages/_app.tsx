import React, { createContext } from "react";
import { AppProps } from "next/app";
import {
  blue,
  grey,
} from "@mui/material/colors";
import "../styles/globals.css";
import Layout from "../components/layout";
import "@mui/joy/styles";
import { PaletteMode } from "@mui/material";
import { RecoilRoot } from "recoil";
// import { paletteModeState } from "@/states/atoms/paletteModeState";
import { Theme } from "./Theme";

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

// テーマモードを切り替える関数を提供するコンテキスト
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function MyApp({ Component, pageProps }: AppProps) {
  // const [mode, setMode] = useState<PaletteMode>("dark");

  // // テーマモード切り替え関数
  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  //     },
  //   }),
  //   []
  // );

  // // テーマ設定の更新
  // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  // // const mode = useRecoilValue(paletteModeState);
  // // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <RecoilRoot>
      <Theme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </RecoilRoot>
  );
}

export default MyApp;
