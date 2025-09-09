import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { newsDetailAtom, setNewsDetailAtom } from '~entities/news/news-detail/model/atoms';

export const useNewsDetail = () => {
  return useAtomValue(newsDetailAtom);
};

export const useSetNewsDetail = () => {
  return useSetAtom(setNewsDetailAtom);
};

export const useResetNewsDetail = () => {
  return useResetAtom(newsDetailAtom);
};
