import { SeoHelmet } from '~shared/lib/seo';
import { News } from '~widgets/shared/news';
import { Banner } from '~widgets/shared/banner';
import { MainBanner } from '~widgets/shared/main-banner';

export function HomePage() {
  return (
    <>
      <SeoHelmet
        title={'Richmond american school' || ''}
        descriptionKey="Richmond american school"
      />
      <MainBanner />
      <div className="max-w-[1536px] w-full lg:max-h-[100vh] min-h-[calc(100vh-228px)] mx-auto px-5">
        <Banner />
        <News />
      </div>
    </>
  );
}
