import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Pagination, Skeleton } from 'antd';

import { NewsCards, useNews, useSetNews } from '~entities/shared/news';

export const News = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const news = useNews();
  const setNews = useSetNews();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await setNews({ page: currentPage, offset: 12 });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const newsCardsView = () => {
    if (news) {
      return (
        <>
          <h2 className="col-span-12 md:col-span-8 sm:col-span-4 text-[30px] mb-5 text-primary">
            {t('routes.news')}
          </h2>
          <NewsCards newsList={news?.data || []} />
          <div className="col-span-12 md:col-span-8 sm:col-span-4 flex justify-center mt-4">
            {news?.totalPages > 12 && (
              <Pagination
                current={currentPage}
                total={news?.total || 0}
                pageSize={12} // Количество элементов на странице
                onChange={handlePageChange}
              />
            )}
          </div>
          {/*<div className="col-span-12 md:col-span-8 sm:col-span-4  flex justify-center mt-[55px]">*/}
          {/*  <button*/}
          {/*    onClick={() => navigate(RoutesUrls.news)}*/}
          {/*    className="bg-primary text-white !rounded-0 border-none p-[15px_25px] cursor-pointer"*/}
          {/*  >*/}
          {/*    Больше новостей*/}
          {/*  </button>*/}
          {/*</div>*/}
        </>
      );
    }

    return null;
  };

  return (
    <div className="grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 pb-5">
      {isLoading ? (
        <div className="col-span-12 md:col-span-8 sm:col-span-4  grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-5 my-skeleton">
          <Skeleton.Input
            className="col-span-12 md:col-span-8 sm:col-span-4 rounded"
            style={{ width: '100%', height: 150 }}
            active
          />
          <Skeleton.Input
            className="col-span-12 md:col-span-8 sm:col-span-4 rounded"
            style={{ width: '100%', height: 150 }}
            active
          />
          <Skeleton.Input
            className="col-span-12 md:col-span-8 sm:col-span-4 rounded"
            style={{ width: '100%', height: 150 }}
            active
          />
        </div>
      ) : (
        <> {newsCardsView()}</>
      )}
    </div>
  );
};
