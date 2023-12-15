import { useEffect, useState } from 'react';
import { useMediaQuery, PaletteMode } from '@mui/material';
import { useRecoilState } from 'recoil';
import { paletteModeState } from '../states/atoms/paletteModeState';

export const usePaletteMode = (): [PaletteMode, (newPaletteMode: PaletteMode) => void] => {
    const [storedMode, setStoredMode] = useRecoilState(paletteModeState);
    const [paletteMode, setPaletteMode] = useState<PaletteMode>(storedMode === 'dark' ? 'dark' : 'light');
  
    useEffect(() => {
      setPaletteMode(storedMode === 'dark' ? 'dark' : 'light');
    }, [storedMode]);
  
    const updatePaletteMode = (newPaletteMode: PaletteMode) => {
      setStoredMode(newPaletteMode);
      setPaletteMode(newPaletteMode);
    };
  
    return [paletteMode, updatePaletteMode];
  };