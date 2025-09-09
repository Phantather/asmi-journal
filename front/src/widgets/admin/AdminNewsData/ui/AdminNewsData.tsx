import { useLayoutEffect, useState } from 'react';

import { Pagination, Spin } from 'antd';

import { NewsItem, useNews, useSetNews } from '~entities/shared/news';
import { AdminNewsTable } from '~entities/admin';
import { AdminNewsDelete, AdminNewsSave } from '~features/admin/AdminNews';

export const AdminNewsData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
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
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(news);

  const newsTableView = () => {
    if (news) {
      return (
        <>
          <AdminNewsTable
            list={news?.data || []}
            setNewsItem={setNewsItem}
            editSlot={<AdminNewsSave type="edit" reFetchNewsList={setNews} newsItem={newsItem} />}
            deleteSlot={<AdminNewsDelete newsItem={newsItem} reFetchNewsList={setNews} />}
          />
          <div className="col-span-12 flex justify-center mt-4">
            {news?.total > 12 && (
              <Pagination
                current={currentPage}
                total={news?.total || 0}
                pageSize={12} // Количество элементов на странице
                onChange={handlePageChange}
              />
            )}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 flex justify-start">
        <AdminNewsSave type="add" reFetchNewsList={setNews} />
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
