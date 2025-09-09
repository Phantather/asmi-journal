import { NavLink, useParams } from 'react-router-dom';

import { Breadcrumb, Spin } from 'antd';

import { useLayoutEffect, useState } from 'react';

import { RoutesUrls } from '~shared/lib/router';
import { NewsDetail, useNewsDetail, useResetNewsDetail, useSetNewsDetail } from '~entities/news';

import { i18n, useTranslation } from '~shared/lib/i18n';

export const NewsDetailData = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: any }>();
  const locale = i18n.language;

  const newsDetail = useNewsDetail();

  const setNewsDetail = useSetNewsDetail();

  const resetNewsDetail = useResetNewsDetail();

  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        resetNewsDetail();

        await setNewsDetail({ id });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setNewsDetail]);

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

  const breadcrumbItems = [
    {
      title: (
        <NavLink to={RoutesUrls.root} className="cursor-pointer text-[14px]">
          {t('routes.home')}
        </NavLink>
      ),
    },
    {
      title: (
        <NavLink to={RoutesUrls.news} className="cursor-pointer text-[14px]">
          {t('routes.news')}
        </NavLink>
      ),
    },
    {
      title: <div className="text-[14px]">{getLocalizedContent(newsDetail?.title)}</div>,
    },
  ];

  console.log(newsDetail);

  const newsDetailView = () => {
    if (newsDetail) {
      return <NewsDetail newsDetail={newsDetail} />;
    }

    return null;
  };

  return (
    <div className="grid grid-cols-12 sm:grid-cols-8 xs:grid-cols-4">
      <Breadcrumb
        separator="/"
        items={breadcrumbItems}
        className="col-span-12 [&>ol]:flex [&>ol]:items-center"
      />
      {isLoading ? (
        <div className="col-span-12 flex justify-center items-center !h-[640px]">
          <Spin size="large"></Spin>
        </div>
      ) : (
        <>
          {newsDetailView()}
          {/*{newsSimilarView()}*/}
        </>
      )}
    </div>
  );
};
