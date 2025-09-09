import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import {
  elantraFilePriceListAtom,
  filePriceListAtom,
  newTusconFilePriceListAtom,
  palisadeFilePriceListAtom,
  santaFeFilePriceListAtom,
  setElantraFilePriceListAtom,
  setFilePriceListAtom,
  setNewTusconFilePriceListAtom,
  setPalisadeFilePriceListAtom,
  setSantaFeFilePriceListAtom,
  setSonataFilePriceListAtom,
  setStariaFilePriceListAtom,
  sonataFilePriceListAtom,
  stariaFilePriceListAtom,
} from '~entities/shared/file-price/model/atoms';

export const useFilePrice = () => {
  return useAtomValue(filePriceListAtom);
};

export const useSetFilePrice = () => {
  return useSetAtom(setFilePriceListAtom);
};

export const useResetFilePrice = () => {
  return useResetAtom(filePriceListAtom);
};

export const useElantraFilePrice = () => {
  return useAtomValue(elantraFilePriceListAtom);
};

export const useSetElantraFilePrice = () => {
  return useSetAtom(setElantraFilePriceListAtom);
};

export const useResetElantraFilePrice = () => {
  return useResetAtom(elantraFilePriceListAtom);
};

export const useSonataFilePrice = () => {
  return useAtomValue(sonataFilePriceListAtom);
};

export const useSetSonataFilePrice = () => {
  return useSetAtom(setSonataFilePriceListAtom);
};

export const useResetSonataFilePrice = () => {
  return useResetAtom(sonataFilePriceListAtom);
};

export const useNewTusconFilePrice = () => {
  return useAtomValue(newTusconFilePriceListAtom);
};

export const useSetNewTusconFilePrice = () => {
  return useSetAtom(setNewTusconFilePriceListAtom);
};

export const useResetNewTusconFilePrice = () => {
  return useResetAtom(newTusconFilePriceListAtom);
};

export const useSantaFeFilePrice = () => {
  return useAtomValue(santaFeFilePriceListAtom);
};

export const useSetSantaFeFilePrice = () => {
  return useSetAtom(setSantaFeFilePriceListAtom);
};

export const useResetSantaFeFilePrice = () => {
  return useResetAtom(santaFeFilePriceListAtom);
};

export const usePalisadeFilePrice = () => {
  return useAtomValue(palisadeFilePriceListAtom);
};

export const useSetPalisadeFilePrice = () => {
  return useSetAtom(setPalisadeFilePriceListAtom);
};

export const useResetPalisadeFilePrice = () => {
  return useResetAtom(palisadeFilePriceListAtom);
};

export const useStariaFilePrice = () => {
  return useAtomValue(stariaFilePriceListAtom);
};

export const useSetStariaFilePrice = () => {
  return useSetAtom(setStariaFilePriceListAtom);
};

export const useResetStariaFilePrice = () => {
  return useResetAtom(stariaFilePriceListAtom);
};
