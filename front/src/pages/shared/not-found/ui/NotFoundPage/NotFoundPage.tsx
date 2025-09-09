import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RoutesUrls } from '~shared/lib/router';
import { SeoHelmet } from '~shared/lib/seo';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SeoHelmet title={t('undefined.label') || ''} />
      <div className="grid place-items-center lg:max-h-[100vh] min-h-[calc(100vh-228px)]">
        <div className="text-center">
          <h2 className="text-[200px] font-medium">404</h2>
          <h3 className="text-[48px] font-medium mb-[30px]">Страница не найдена</h3>
          <p className="mb-5">
            К сожалению, страница, которую вы искали, отсутствует или переместилась.
          </p>
          <Link to={RoutesUrls.root} className="text-primary underline">
            Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </>
  );
};
