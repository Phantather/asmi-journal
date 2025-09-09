import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { INewsDetailParams, getNewsDetail } from '~entities/news/news-detail/api';
import { NewsDetailList } from '~entities/news/news-detail/model/types';

export const newsDetailAtom = atomWithDefault<NewsDetailList | null>((_get) => null);

export const setNewsDetailAtom = atom<NewsDetailList | null, INewsDetailParams, Promise<void>>(
  (get) => get(newsDetailAtom),
  async (_get, set, params) => {
    const response = await getNewsDetail(params);

    if (response.data?.error) {
      set(newsDetailAtom, null);
    } else if (response) {
      set(newsDetailAtom, response);
    }
  }
);
