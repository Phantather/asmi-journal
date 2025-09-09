import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getYear } from '../api';

import { YearList } from './types';
export const yearListAtom = atomWithDefault<YearList | null>((_get) => null);

export const setYearListAtom = atom<YearList | null, undefined, Promise<void>>(
  (get) => get(yearListAtom),
  async (_get, set) => {
    const response = await getYear();

    if (response.data?.error) {
      set(yearListAtom, null);
    } else if (response.data) {
      set(yearListAtom, response.data);
    }
  }
);
