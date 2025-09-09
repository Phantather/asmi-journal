import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getClass } from '../api';

import { ClassList } from './types';
export const classListAtom = atomWithDefault<ClassList | null>((_get) => null);

export const setClassListAtom = atom<ClassList | null, undefined, Promise<void>>(
  (get) => get(classListAtom),
  async (_get, set) => {
    const response = await getClass();

    if (response.data?.error) {
      set(classListAtom, null);
    } else if (response.data) {
      set(classListAtom, response.data);
    }
  }
);
