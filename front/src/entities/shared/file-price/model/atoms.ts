import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { ApiFilePriceData, IFilePriceParams, getFilePrice } from '~entities/shared/file-price/api';

export const filePriceListAtom = atomWithDefault<ApiFilePriceData | null>((_get) => null);

export const setFilePriceListAtom = atom<ApiFilePriceData | null, IFilePriceParams, Promise<void>>(
  (get) => get(filePriceListAtom),
  async (_get, set, params) => {
    const response = await getFilePrice(params);

    if (response.data?.error) {
      set(filePriceListAtom, null);
    } else if (response) {
      set(filePriceListAtom, response);
    }
  }
);

export const elantraFilePriceListAtom = atomWithDefault<ApiFilePriceData | null>((_get) => null);

export const setElantraFilePriceListAtom = atom<
  ApiFilePriceData | null,
  IFilePriceParams,
  Promise<void>
>(
  (get) => get(elantraFilePriceListAtom),
  async (_get, set, params) => {
    const response = await getFilePrice(params);

    if (response.data?.error) {
      set(elantraFilePriceListAtom, null);
    } else if (response) {
      set(elantraFilePriceListAtom, response);
    }
  }
);

export const sonataFilePriceListAtom = atomWithDefault<ApiFilePriceData | null>((_get) => null);

export const setSonataFilePriceListAtom = atom<
  ApiFilePriceData | null,
  IFilePriceParams,
  Promise<void>
>(
  (get) => get(sonataFilePriceListAtom),
  async (_get, set, params) => {
    const response = await getFilePrice(params);

    if (response.data?.error) {
      set(sonataFilePriceListAtom, null);
    } else if (response) {
      set(sonataFilePriceListAtom, response);
    }
  }
);

export const newTusconFilePriceListAtom = atomWithDefault<ApiFilePriceData | null>((_get) => null);

export const setNewTusconFilePriceListAtom = atom<
  ApiFilePriceData | null,
  IFilePriceParams,
  Promise<void>
>(
  (get) => get(newTusconFilePriceListAtom),
  async (_get, set, params) => {
    const response = await getFilePrice(params);

    if (response.data?.error) {
      set(newTusconFilePriceListAtom, null);
    } else if (response) {
      set(newTusconFilePriceListAtom, response);
    }
  }
);

export const santaFeFilePriceListAtom = atomWithDefault<ApiFilePriceData | null>((_get) => null);

export const setSantaFeFilePriceListAtom = atom<
  ApiFilePriceData | null,
  IFilePriceParams,
  Promise<void>
>(
  (get) => get(santaFeFilePriceListAtom),
  async (_get, set, params) => {
    const response = await getFilePrice(params);

    if (response.data?.error) {
      set(santaFeFilePriceListAtom, null);
    } else if (response) {
      set(santaFeFilePriceListAtom, response);
    }
  }
);

export const palisadeFilePriceListAtom = atomWithDefault<ApiFilePriceData | null>((_get) => null);

export const setPalisadeFilePriceListAtom = atom<
  ApiFilePriceData | null,
  IFilePriceParams,
  Promise<void>
>(
  (get) => get(palisadeFilePriceListAtom),
  async (_get, set, params) => {
    const response = await getFilePrice(params);

    if (response.data?.error) {
      set(palisadeFilePriceListAtom, null);
    } else if (response) {
      set(palisadeFilePriceListAtom, response);
    }
  }
);

export const stariaFilePriceListAtom = atomWithDefault<ApiFilePriceData | null>((_get) => null);

export const setStariaFilePriceListAtom = atom<
  ApiFilePriceData | null,
  IFilePriceParams,
  Promise<void>
>(
  (get) => get(stariaFilePriceListAtom),
  async (_get, set, params) => {
    const response = await getFilePrice(params);

    if (response.data?.error) {
      set(stariaFilePriceListAtom, null);
    } else if (response) {
      set(stariaFilePriceListAtom, response);
    }
  }
);
