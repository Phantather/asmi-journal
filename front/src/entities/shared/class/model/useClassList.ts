import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { classListAtom, setClassListAtom } from './atoms';

export const useClassList = () => {
  return useAtomValue(classListAtom);
};

export const useSetClassList = () => {
  return useSetAtom(setClassListAtom);
};

export const useResetClassList = () => {
  return useResetAtom(classListAtom);
};
