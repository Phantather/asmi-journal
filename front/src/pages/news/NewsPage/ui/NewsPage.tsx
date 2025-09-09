import { useEffect } from 'react';

import { SeoHelmet } from '~shared/lib/seo';
import { NewsData } from '~widgets/news';

export function NewsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SeoHelmet
        title="Новости"
        descriptionKey="Новости Hyundai – будьте в курсе последних событий, новинок, акций и специальных предложений от официального дилера."
      />
      <div className="max-w-[1536px] w-full lg:max-h-[100vh] min-h-[calc(100vh-228px)] mx-auto px-5">
        <NewsData />
      </div>
    </>
  );
}
