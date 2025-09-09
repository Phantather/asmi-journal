import { useLayoutEffect, useState } from 'react';

import { Spin } from 'antd';

import { AdminBannerTable } from '~entities/admin/AdminBanner';
import { BannerItem, useBanner, useSetBanner } from '~entities/shared/banner';
import { AdminBannerDelete, AdminBannerSave } from '~features/admin/AdminBanner';

// import { BannerItem, useBanner, useSetBanner } from '~entities/shared/news';
// import { AdminBannerTable } from '~entities/admin';
// import {
//   AdminBannerDelete,
//   AdminBannerSave,
//   AdminBannerSaveProps,
// } from '~features/admin/AdminBanner';

export const AdminBannerData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerItem, setBannerItem] = useState<BannerItem | null>(null);

  const banner = useBanner();
  const setBanner = useSetBanner();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!banner) {
          await setBanner();
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const newsTableView = () => {
    if (banner) {
      return (
        <AdminBannerTable
          list={banner?.data || []}
          setBannerItem={setBannerItem}
          editSlot={
            <AdminBannerSave type="edit" reFetchBannerList={setBanner} bannerItem={bannerItem} />
          }
          deleteSlot={<AdminBannerDelete bannerItem={bannerItem} reFetchBannerList={setBanner} />}
        />
      );
    }

    return null;
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 flex justify-start">
        <AdminBannerSave type="add" reFetchBannerList={setBanner} />
      </div>
      {isLoading ? (
        <div className="col-span-12 flex justify-center items-center">
          <Spin size="large"></Spin>
        </div>
      ) : (
        <>{newsTableView()}</>
      )}
    </div>
  );
};
