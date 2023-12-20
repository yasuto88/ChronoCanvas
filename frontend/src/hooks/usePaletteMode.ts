// import { useEffect, useState } from 'react';
// import { useMediaQuery, PaletteMode } from '@mui/material';
// import { useRecoilState } from 'recoil';
// import { paletteModeState } from '../states/atoms/paletteModeState';

// export const usePaletteMode = (): [PaletteMode, (newPaletteMode: PaletteMode) => void] => {
//     const [storedMode, setStoredMode] = useRecoilState(paletteModeState);
  
//     // ページロード時にセッションストレージからテーマモードを読み込む
//     useEffect(() => {
//       const storedPaletteMode = sessionStorage.getItem('paletteMode');
//       console.log('ロード時: セッションストレージから読み込んだテーマモード:', storedPaletteMode);
//       if (storedPaletteMode === 'dark' || storedPaletteMode === 'light') {
//         setStoredMode(storedPaletteMode as PaletteMode);
//       }
//     }, []);
  
//     // テーマモードが変更されたときにセッションストレージに保存する
//     useEffect(() => {
//       sessionStorage.setItem('paletteMode', storedMode);
//     }, [storedMode]);
  
//     const updatePaletteMode = (newPaletteMode: PaletteMode) => {
//       setStoredMode(newPaletteMode);
//     };
  
//     return [storedMode, updatePaletteMode];
//   };
  