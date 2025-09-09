import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { INewsSimilarParams, NewsSimilarList, getNewsSimilar } from '~entities/news/news-similar';

export const newsSimilarAtom = atomWithDefault<NewsSimilarList | null>((_get) => null);

export const setNewsSimilarAtom = atom<NewsSimilarList | null, INewsSimilarParams, Promise<void>>(
  (get) => get(newsSimilarAtom),
  async (_get, set, params) => {
    const response = await getNewsSimilar(params);

    if (response.data?.error) {
      set(newsSimilarAtom, null);
    } else if (response) {
      set(newsSimilarAtom, response?.data);
    }
  }
);
