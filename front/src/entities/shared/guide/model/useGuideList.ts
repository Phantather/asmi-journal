import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { guideListAtom, setGuideListAtom } from './atoms';

export const useGuideList = () => {
  return useAtomValue(guideListAtom);
};

export const useSetGuidesList = () => {
  return useSetAtom(setGuideListAtom);
};

export const useResetGuidesList = () => {
  return useResetAtom(guideListAtom);
};
