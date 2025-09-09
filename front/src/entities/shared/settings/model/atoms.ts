import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getSettings } from '../api';

import { SettingsList } from './types';

export const settingsAtom = atomWithDefault<SettingsList | null>((_get) => null);

export const setSettingsAtom = atom<SettingsList | null, undefined, Promise<void>>(
  (get) => get(settingsAtom),
  async (_get, set) => {
    const response = await getSettings();

    if (response.data?.error) {
      set(settingsAtom, null);
    } else if (response.data) {
      set(settingsAtom, response.data);
    }
  }
);
