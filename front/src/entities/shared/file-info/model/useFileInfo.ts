import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import {
  elantraFileInfoAtom,
  fileInfoListAtom,
  newTusconFileInfoAtom,
  palisadeFileInfoAtom,
  santaFeFileInfoAtom,
  setElantraFileInfoAtom,
  setFileInfoListAtom,
  setNewTusconInfoAtom,
  setPalisadeInfoAtom,
  setSantaFeInfoAtom,
  setSonataFileInfoAtom,
  setStariaInfoAtom,
  sonataFileInfoAtom,
  stariaFileInfoAtom,
} from './atoms';

export const useFileInfo = () => {
  return useAtomValue(fileInfoListAtom);
};

export const useSetFileInfo = () => {
  return useSetAtom(setFileInfoListAtom);
};

export const useResetFileInfo = () => {
  return useResetAtom(fileInfoListAtom);
};

export const useElantraFileInfo = () => {
  return useAtomValue(elantraFileInfoAtom);
};

export const useSetElantraFileInfo = () => {
  return useSetAtom(setElantraFileInfoAtom);
};

export const useResetElantraFileInfo = () => {
  return useResetAtom(elantraFileInfoAtom);
};

export const useSonataFileInfo = () => {
  return useAtomValue(sonataFileInfoAtom);
};

export const useSetSonataFileInfo = () => {
  return useSetAtom(setSonataFileInfoAtom);
};

export const useResetSonataFileInfo = () => {
  return useResetAtom(sonataFileInfoAtom);
};

export const useNewTusconFileInfo = () => {
  return useAtomValue(newTusconFileInfoAtom);
};

export const useSetNewTusconFileInfo = () => {
  return useSetAtom(setNewTusconInfoAtom);
};

export const useResetNewTusconFileInfo = () => {
  return useResetAtom(newTusconFileInfoAtom);
};

export const useSantaFeFileInfo = () => {
  return useAtomValue(santaFeFileInfoAtom);
};

export const useSetSantaFeFileInfo = () => {
  return useSetAtom(setSantaFeInfoAtom);
};

export const useResetSantaFeFileInfo = () => {
  return useResetAtom(santaFeFileInfoAtom);
};

export const usePalisadeFileInfo = () => {
  return useAtomValue(palisadeFileInfoAtom);
};

export const useSetPalisadeFileInfo = () => {
  return useSetAtom(setPalisadeInfoAtom);
};

export const useResetPalisadeFileInfo = () => {
  return useResetAtom(palisadeFileInfoAtom);
};

export const useStariaFileInfo = () => {
  return useAtomValue(stariaFileInfoAtom);
};

export const useSetStariaFileInfo = () => {
  return useSetAtom(setStariaInfoAtom);
};

export const useResetStariaFileInfo = () => {
  return useResetAtom(stariaFileInfoAtom);
};
