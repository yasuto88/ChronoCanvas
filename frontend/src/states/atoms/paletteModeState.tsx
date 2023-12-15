import { atom } from 'recoil';
import { PaletteMode } from '@mui/material';

export const paletteModeState = atom<string>({
  key: 'PaletteMode',
  default: "light",
});
