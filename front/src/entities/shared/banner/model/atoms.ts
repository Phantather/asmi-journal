import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { ApiBannerData, getBanner } from '~entities/shared/banner';

export const bannerAtom = atomWithDefault<ApiBannerData | null>((_get) => null);

export const setBannerAtom = atom<ApiBannerData | null, undefined, Promise<void>>(
  (get) => get(bannerAtom),
  async (_get, set) => {
    const response = await getBanner();

    if (response.data?.error) {
      set(bannerAtom, null);
    } else if (response) {
      set(bannerAtom, response);
    }
  }
);
