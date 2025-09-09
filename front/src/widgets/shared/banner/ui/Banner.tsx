import React, { useLayoutEffect, useState } from 'react';
import { Skeleton } from 'antd';

import { useShortNews } from '~entities/shared/news';

import { BannerView, useBanner, useSetBanner } from '~entities/shared/banner';

export const Banner = () => {
  const [isLoading, setIsLoading] = useState(false);

  const banner = useBanner();
  const shortNews = useShortNews();

  const setBanner = useSetBanner();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!banner) {
          await setBanner();

          await shortNews();
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const bannerView = () => {
    if (banner) {
      return <BannerView banner={banner.data || []} shortNews={shortNews?.data || []} />;
    }

    return null;
  };

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-5 py-5 w-full my-skeleton">
          {/* Левая часть (баннеры) */}
          <Skeleton.Image
            active
            className="col-span-8 md:col-span-8 sm:col-span-4 my-skeleton rounded"
            style={{ width: '100%', height: 200 }}
          />

          {/* Правая часть */}
          <Skeleton.Node
            active
            className="col-span-4 md:col-span-8 sm:col-span-4 rounded"
            style={{ width: '100%', height: 200 }}
          >
            <div />
          </Skeleton.Node>
        </div>
      ) : (
        bannerView()
      )}
    </>
  );
};
