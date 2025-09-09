// import { api, createAuthenticatedRequestHandler } from '~shared/api';
import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getUser } from '../api';
// import { getUser, mockGetUser } from '../api';

import { User } from './types';

// const isTestMode = import.meta.env.VITE_TEST_MODE;

export const viewerAtom = atomWithDefault<User | null>((_get) => null);

export const setUserAtom = atom<User | null, { authState: User | null }, Promise<void>>(
  null,
  async (_get, set, { authState }) => {
    if (authState) {
      set(viewerAtom, authState);

      return;
    }
    // api.interceptors.request.use(createAuthenticatedRequestHandler(token));

    // const response = isTestMode === 'true' ? await mockGetUser() : await getUser();
    const response = await getUser();
    const newValue = response?.data?.authState;
    set(viewerAtom, newValue);
  }
);
