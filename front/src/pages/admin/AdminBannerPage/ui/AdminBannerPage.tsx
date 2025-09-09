import { useEffect } from 'react';

import { SeoHelmet } from '~shared/lib/seo';

import { AdminBannerData } from '~widgets/admin';

export function AdminBannerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SeoHelmet
        title="Админ панель"
        descriptionKey="Админ-панель дилера Hyundai: публикация новостей, управление ценами, загрузка брошюр и руководств."
      />
      <AdminBannerData />
    </>
  );
}
