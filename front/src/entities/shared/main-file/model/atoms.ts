import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { ApiMainFileData, getMainFile } from '~entities/shared/main-file/api';

export const mainFileListAtom = atomWithDefault<ApiMainFileData | null>((_get) => null);

export const setMainFileListAtom = atom<ApiMainFileData | null, unknown, Promise<void>>(
  (get) => get(mainFileListAtom),
  async (_get, set) => {
    const response = await getMainFile();

    if (response.data?.error) {
      set(mainFileListAtom, null);
    } else if (response) {
      set(mainFileListAtom, response);
    }
  }
);
