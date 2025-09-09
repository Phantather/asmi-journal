import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { ApiFileInfoData, IFileInfoParams, getFileInfo } from '../api';

export const fileInfoListAtom = atomWithDefault<ApiFileInfoData | null>((_get) => null);

export const setFileInfoListAtom = atom<ApiFileInfoData | null, IFileInfoParams, Promise<void>>(
  (get) => get(fileInfoListAtom),
  async (_get, set, params) => {
    const response = await getFileInfo(params);

    if (response.data?.error) {
      set(fileInfoListAtom, null);
    } else if (response) {
      set(fileInfoListAtom, response);
    }
  }
);

export const elantraFileInfoAtom = atomWithDefault<ApiFileInfoData | null>((_get) => null);

export const setElantraFileInfoAtom = atom<ApiFileInfoData | null, IFileInfoParams, Promise<void>>(
  (get) => get(elantraFileInfoAtom),
  async (_get, set, params) => {
    const response = await getFileInfo(params);

    if (response.data?.error) {
      set(elantraFileInfoAtom, null);
    } else if (response) {
      set(elantraFileInfoAtom, response);
    }
  }
);

export const sonataFileInfoAtom = atomWithDefault<ApiFileInfoData | null>((_get) => null);

export const setSonataFileInfoAtom = atom<ApiFileInfoData | null, IFileInfoParams, Promise<void>>(
  (get) => get(sonataFileInfoAtom),
  async (_get, set, params) => {
    const response = await getFileInfo(params);

    if (response.data?.error) {
      set(sonataFileInfoAtom, null);
    } else if (response) {
      set(sonataFileInfoAtom, response);
    }
  }
);

export const newTusconFileInfoAtom = atomWithDefault<ApiFileInfoData | null>((_get) => null);

export const setNewTusconInfoAtom = atom<ApiFileInfoData | null, IFileInfoParams, Promise<void>>(
  (get) => get(newTusconFileInfoAtom),
  async (_get, set, params) => {
    const response = await getFileInfo(params);

    if (response.data?.error) {
      set(newTusconFileInfoAtom, null);
    } else if (response) {
      set(newTusconFileInfoAtom, response);
    }
  }
);

export const santaFeFileInfoAtom = atomWithDefault<ApiFileInfoData | null>((_get) => null);

export const setSantaFeInfoAtom = atom<ApiFileInfoData | null, IFileInfoParams, Promise<void>>(
  (get) => get(santaFeFileInfoAtom),
  async (_get, set, params) => {
    const response = await getFileInfo(params);

    if (response.data?.error) {
      set(santaFeFileInfoAtom, null);
    } else if (response) {
      set(santaFeFileInfoAtom, response);
    }
  }
);

export const palisadeFileInfoAtom = atomWithDefault<ApiFileInfoData | null>((_get) => null);

export const setPalisadeInfoAtom = atom<ApiFileInfoData | null, IFileInfoParams, Promise<void>>(
  (get) => get(palisadeFileInfoAtom),
  async (_get, set, params) => {
    const response = await getFileInfo(params);

    if (response.data?.error) {
      set(palisadeFileInfoAtom, null);
    } else if (response) {
      set(palisadeFileInfoAtom, response);
    }
  }
);

export const stariaFileInfoAtom = atomWithDefault<ApiFileInfoData | null>((_get) => null);

export const setStariaInfoAtom = atom<ApiFileInfoData | null, IFileInfoParams, Promise<void>>(
  (get) => get(stariaFileInfoAtom),
  async (_get, set, params) => {
    const response = await getFileInfo(params);

    if (response.data?.error) {
      set(stariaFileInfoAtom, null);
    } else if (response) {
      set(stariaFileInfoAtom, response);
    }
  }
);
