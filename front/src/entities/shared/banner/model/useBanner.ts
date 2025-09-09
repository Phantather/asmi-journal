import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { bannerAtom, setBannerAtom } from '~entities/shared/banner';

export const useBanner = () => {
  return useAtomValue(bannerAtom);
};

export const useSetBanner = () => {
  return useSetAtom(setBannerAtom);
};

export const useResetBanner = () => {
  return useResetAtom(bannerAtom);
};
