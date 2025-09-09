import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { newsSimilarAtom, setNewsSimilarAtom } from '~entities/news/news-similar';

export const useNewsSimilar = () => {
  return useAtomValue(newsSimilarAtom);
};

export const useSetNewsSimilar = () => {
  return useSetAtom(setNewsSimilarAtom);
};

export const useResetNewsSimilar = () => {
  return useResetAtom(newsSimilarAtom);
};
