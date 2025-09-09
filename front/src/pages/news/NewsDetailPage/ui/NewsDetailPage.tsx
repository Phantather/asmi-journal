import { useEffect } from 'react';

import { SeoHelmet } from '~shared/lib/seo';
import { NewsDetailData } from '~widgets/news';

export function NewsDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SeoHelmet
        title="Новость"
        descriptionKey="Детальная страница новостей RICHMOND AMERICAN SCHOOL"
      />
      <div className="max-w-[1536px] mx-auto w-full px-5 py-5">
        <NewsDetailData />
      </div>
    </>
  );
}
