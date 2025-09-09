import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { setYearListAtom, yearListAtom } from './atoms';

export const useYearList = () => {
  return useAtomValue(yearListAtom);
};

export const useSetYearList = () => {
  return useSetAtom(setYearListAtom);
};

export const useResetYearList = () => {
  return useResetAtom(yearListAtom);
};
