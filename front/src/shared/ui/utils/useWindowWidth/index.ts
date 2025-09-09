import { useEffect, useState } from 'react';

import { debounce } from '~shared/lib/utils';

export const useWindowInnerWidth = () => {
  const [windowWidth, setInnerWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setInnerWidth(window.innerWidth);
    }, 0);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return windowWidth;
};
