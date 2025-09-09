import { useAtomValue } from '~shared/lib/atom-state';

import { langListAtom } from './atoms';

export const useLangList = () => {
  return useAtomValue(langListAtom);
};
