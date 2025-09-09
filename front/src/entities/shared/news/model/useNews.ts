import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { newsAtom, setNewsAtom, shortNewsAtom } from '~entities/shared/news/model/atoms';

export const useNews = () => {
  return useAtomValue(newsAtom);
};

export const useSetNews = () => {
  return useSetAtom(setNewsAtom);
};

export const useResetNews = () => {
  return useResetAtom(newsAtom);
};

export const useShortNews = () => {
  return useAtomValue(shortNewsAtom);
};
