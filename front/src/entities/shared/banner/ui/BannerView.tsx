import { FC, useLayoutEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';

import { useNavigate } from 'react-router';

import { RoutesUrls } from '~shared/lib/router';

import { BannerList } from '~entities/shared/banner';
import 'swiper/css';
import 'swiper/css/navigation';

import { NextIcon, PrevIcon } from '~shared/ui';
import { NewsItem } from '~entities/shared/news';
import { i18n } from '~shared/lib/i18n';
import { dayjs } from '~shared/lib/time/dayjs';

export interface BannerViewProps {
  banner: BannerList;
  shortNews: NewsItem[];
}

export const BannerView: FC<BannerViewProps> = ({ banner, shortNews }) => {
  const locale = i18n.language;
  const navigate = useNavigate();

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  useLayoutEffect(() => {
    if (swiperRef.current && navigationPrevRef.current && navigationNextRef.current) {
      swiperRef.current.params.navigation.prevEl = navigationPrevRef.current;
      swiperRef.current.params.navigation.nextEl = navigationNextRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [banner]);

  const getLocalizedContent = (
    content: { [key: string]: string | null } | undefined,
    maxLength?: number
  ): string => {
    if (!content) {
      return '';
    }

    const text = content[locale] || '';

    if (maxLength && text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }

    return text;
  };

  return (
    <>
      <div className="grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-5 py-5 items-stretch">
        {/* Левая часть (баннер) */}
        <div className="grid col-span-7 md:col-span-8 sm:col-span-4 relative h-full">
          <button
            ref={navigationPrevRef}
            className="absolute top-1/2 translate-y-[-50%] left-5 z-10 w-[35px] h-[35px] flex items-center justify-center bg-white hover:bg-secondary [&>svg]:hover:stroke-white transition rounded border-none cursor-pointer"
          >
            <PrevIcon />
          </button>

          <Swiper
            freeMode
            loop
            modules={[FreeMode, Navigation]}
            onSwiper={(swiper: unknown) => {
              swiperRef.current = swiper;
            }}
            className="swiper h-full"
          >
            {banner?.map((bannerItem, index) => (
              <SwiperSlide
                key={`${bannerItem.id_banner}_${index}`}
                className="relative h-full"
                style={{
                  backgroundImage: `url(${bannerItem?.banner_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              >
                <div className="max-w-[1024px] w-full h-full relative">
                  <h1 className="text-[20px] text-primary absolute bottom-[60px] left-5 bg-white p-1 rounded">
                    {bannerItem.banner_title_ru}
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={navigationNextRef}
            className="absolute top-1/2 translate-y-[-50%] right-5 z-10 w-[35px] h-[35px] flex items-center justify-center bg-white hover:bg-secondary [&>svg]:hover:stroke-white transition rounded border-none cursor-pointer"
          >
            <NextIcon />
          </button>
        </div>

        {/* Правая часть (новости) */}
        {shortNews && (
          <ul className="grid col-span-5 md:col-span-8 sm:col-span-4 bg-white list-none gap-5 p-0 h-full">
            {shortNews?.map((item, index) => (
              <li
                onClick={() => navigate(`${RoutesUrls?.news}/${item?.id}`)}
                key={`${item?.id}_${index}`}
                className="border border-solid border-primary rounded p-2 flex flex-col gap-1 cursor-pointer"
              >
                <h3 className="text-primary">{getLocalizedContent(item?.title)}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(item?.description, 100),
                  }}
                />
                <p className="text-[14px] text-[#858585]">
                  {dayjs(item?.date).locale('ru').format('D MMMM, YYYY')}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
