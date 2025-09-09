import { useAtomValue, useSetAtom } from '~shared/lib/atom-state';

import { collapsedAtom, setCollapsedAtom } from './atoms';

export const useCollapsed = () => {
  return useAtomValue(collapsedAtom);
};

export const useSetCollapsed = () => {
  return useSetAtom(setCollapsedAtom);
};
