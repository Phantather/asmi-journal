import { atom, atomWithDefault } from '~shared/lib/atom-state';
import { GuidesList } from '~entities/shared/guide/model/types';
import { getGuide } from '~entities/shared/guide';

export const guideListAtom = atomWithDefault<GuidesList | null>((_get) => null);

export const setGuideListAtom = atom<GuidesList | null, undefined, Promise<void>>(
  (get) => get(guideListAtom),
  async (_get, set) => {
    const response = await getGuide();

    if (response.data?.error) {
      set(guideListAtom, null);
    } else if (response.data) {
      set(guideListAtom, response.data);
    }
  }
);
