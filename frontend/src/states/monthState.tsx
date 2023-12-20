// states/monthState.ts
import { atom, useSetRecoilState } from 'recoil';

// 月の状態を管理するRecoil Atom
export const monthState = atom<string>({
  key: 'monthState',
  default: new Date().toISOString().substring(0, 7), // YYYY-MM形式
});

// 月の状態を更新するカスタムフック
export const useUpdateMonth = () => {
  const setMonth = useSetRecoilState(monthState);

  return (newMonth: string) => {
    setMonth(newMonth);
  };
};
