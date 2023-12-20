import { atom, AtomEffect, useRecoilState } from "recoil";
import { PaletteMode, useMediaQuery } from "@mui/material";
import { useEffect } from "react";

const PALETTE_MODE_STORAGE_KEY = "palette_mode";

const localStorageEffect: (
  key: string
) => AtomEffect<PaletteMode | undefined> =
  (key) =>
  ({ onSet }) => {
    onSet((newValue, _, isReset) => {
      if (isReset || newValue === undefined) {
        localStorage.removeItem(key);
        return;
      }

      localStorage.setItem(key, newValue);
    });
  };

const paletteModeState = atom<PaletteMode | undefined>({
  key: "myAppPaletteMode", // キーにプレフィックスを追加
  default: undefined,
  effects: [localStorageEffect(PALETTE_MODE_STORAGE_KEY)],
});

export type setPaletteModeType = (paletteMode: PaletteMode) => void;
export type usePaletteModeType = () => [PaletteMode, setPaletteModeType];

export const usePaletteMode: usePaletteModeType = () => {
  const prefersPaletteMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  useEffect(() => {
    // localStorageから取得した値がnullの場合はデフォルト値を使用
    const storedPaletteMode =
      localStorage.getItem(PALETTE_MODE_STORAGE_KEY) ?? prefersPaletteMode;
    const newPaletteMode = storedPaletteMode ?? prefersPaletteMode;
    setPaletteMode(newPaletteMode as PaletteMode);

    // data-theme属性を更新
    document.body.setAttribute("data-theme", newPaletteMode);
  }, [paletteMode, prefersPaletteMode]);

  return [
    paletteMode ?? prefersPaletteMode,
    (paletteMode: PaletteMode) => setPaletteMode(paletteMode),
  ];
};
