import { atom } from '~shared/lib/atom-state';

import { LangList } from './types';
import { defaultLangList } from './consts';

export const langListAtom = atom<LangList>(defaultLangList);
