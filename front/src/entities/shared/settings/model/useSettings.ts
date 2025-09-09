import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { setSettingsAtom, settingsAtom } from './atoms';

export const useSettings = () => {
  return useAtomValue(settingsAtom);
};

export const useSetSettings = () => {
  return useSetAtom(setSettingsAtom);
};

export const useResetSettings = () => {
  return useResetAtom(settingsAtom);
};
