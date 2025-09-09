import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { mainFileListAtom, setMainFileListAtom } from '~entities/shared/main-file/model/atoms';

export const useMainFile = () => {
  return useAtomValue(mainFileListAtom);
};

export const useSetMainFile = () => {
  return useSetAtom(setMainFileListAtom);
};

export const useResetMainFile = () => {
  return useResetAtom(mainFileListAtom);
};
