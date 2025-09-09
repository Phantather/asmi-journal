import React, { FC, useLayoutEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { NewsDetailItem } from '~entities/news';
import { dayjs } from '~shared/lib/time/dayjs';
import { NextIcon, PrevIcon, useWindowInnerWidth } from '~shared/ui';
import { i18n } from '~shared/lib/i18n';

export interface NewsDetailProps {
  newsDetail: NewsDetailItem;
}

export const NewsDetail: FC<NewsDetailProps> = ({ newsDetail }) => {
  const locale = i18n.language;
  const windowWidth = useWindowInnerWidth();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
  }, []);

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
    <div className="col-span-12 mt-5">
      <h1 className="text-primary text-[48px] font-semibold">
        {getLocalizedContent(newsDetail?.title)}
      </h1>
      <p className="text-gray text-[16px] my-[20px]">
        {dayjs(newsDetail?.date).locale('ru').format('D MMMM, YYYY')}
      </p>
      {windowWidth > 768 ? (
        <div className="grid gap-[10px]">
          {newsDetail?.main_images?.length > 1 ? (
            <>
              <Swiper
                spaceBetween={10}
                // navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="mySwiper2"
              >
                {newsDetail?.main_images?.map((image, idx) => (
                  <SwiperSlide key={`${image?.id}_${idx}`}>
                    <img src={image?.url} alt="news" className="w-full !h-[640px]" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                freeMode
                watchSlidesProgress
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="mySwiper"
              >
                {newsDetail?.main_images?.map((image, idx) => (
                  <SwiperSlide key={`${image?.id}_${idx}`}>
                    <img src={image?.url} alt="news" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <>
              <img
                className="w-full h-[640px] object-cover"
                src={newsDetail?.main_images?.[0]?.url}
                alt="news"
              />
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-[10px]">
          {newsDetail?.main_images?.length > 1 ? (
            <>
              <Swiper
                spaceBetween={10}
                // navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Autoplay, FreeMode]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="mySwiper2"
              >
                {newsDetail?.main_images?.map((image, idx) => (
                  <SwiperSlide key={`${image?.id}_${idx}`}>
                    <img src={image?.url} alt="news" className="w-full !h-[340px] object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <>
              <img
                className="w-full h-[640px] sm:h-[400px] xs:h-[300px] object-cover"
                width="640"
                height="640"
                src={newsDetail?.main_images?.[0]?.url}
                alt="news"
              />
            </>
          )}
        </div>
      )}

      <div className="mt-[40px]">
        {newsDetail?.content?.map((contentItem) => (
          <div key={contentItem.id} className="mb-12">
            {/* Render the HTML content */}
            <div
              dangerouslySetInnerHTML={{
                __html: contentItem?.[`description_${locale as string}`] || '',
              }}
              className="mb-6"
            />

            {/* Dynamic images display */}
            {contentItem.images?.length > 0 && (
              <div className="mt-6">
                {contentItem.images.length === 1 ? (
                  // Single image display
                  <img
                    src={contentItem.images[0].url}
                    alt={contentItem.images[0].name}
                    className="w-full max-h-[500px] object-cover"
                  />
                ) : (
                  // Multiple images slider
                  <div className="relative">
                    <button
                      ref={navigationPrevRef}
                      className="absolute top-1/2 translate-y-[-50%] left-5 z-10 w-[35px] h-[35px] flex items-center justify-center bg-white hover:bg-secondary [&>svg]:hover:stroke-white e transition rounded border-none cursor-pointer"
                    >
                      <PrevIcon />
                    </button>
                    <Swiper
                      freeMode
                      spaceBetween={20}
                      slidesPerView={Math.min(contentItem.images.length, 2)}
                      modules={[FreeMode, Navigation]}
                      onSwiper={(swiper: unknown) => {
                        swiperRef.current = swiper;
                      }}
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: Math.min(contentItem.images.length, 2) },
                        1024: { slidesPerView: Math.min(contentItem.images.length, 3) },
                      }}
                      className="content-images-slider"
                    >
                      {contentItem.images.map((image) => (
                        <SwiperSlide key={image.id}>
                          <div className="h-[300px] sm:h-[400px]">
                            <img src={image.url} alt={image.name} className="w-full h-full" />
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
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
