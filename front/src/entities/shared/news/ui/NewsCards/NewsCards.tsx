import { FC } from 'react';
import { useNavigate } from 'react-router';

import { NewsItem } from '~entities/shared/news';
import { dayjs } from '~shared/lib/time/dayjs';
import { RoutesUrls } from '~shared/lib/router';
import { i18n } from '~shared/lib/i18n';

export interface NewsCardsProps {
  newsList: NewsItem[];
}

export const NewsCards: FC<NewsCardsProps> = ({ newsList }) => {
  const locale = i18n.language;
  const navigate = useNavigate();

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
    <div className="col-span-12 md:col-span-8 sm:col-span-4 grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-5">
      {newsList.map((newsItem, idx) => (
        <div
          onClick={() => navigate(`${RoutesUrls?.news}/${newsItem?.id}`)}
          key={`${newsItem?.id}_${idx}`}
          className="col-span-12 md:col-span-8 sm:col-span-4 w-full cursor-pointer bg-white border border-solid border-primary flex md:flex-col items-center gap-5 p-5 rounded hover:shadow-lg transition-shadow"
        >
          {newsItem?.image_name && (
            <img
              src={newsItem.image_name}
              alt="news"
              width="300"
              height="205"
              className="md:w-full md:h-[400px] sm:h-[305px] object-cover rounded"
            />
          )}

          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-[28px] text-primary">
              {getLocalizedContent(newsItem?.title)}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(newsItem?.description, 200),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
