import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useCollapsed, useSetCollapsed } from '~features/shared/collapse';

import { useTranslation } from '~shared/lib/i18n';
import { RoutesUrls } from '~shared/lib/router';
import { Header, Logo, MenuIcon, useWindowInnerWidth } from '~shared/ui';
import { SetRegistrationView } from '~features/shared/locale';

export interface AppHeaderProps extends Partial<ComponentWithChild> {}

export const AppHeader: FC<AppHeaderProps> = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [pageTitle, setPageTitle] = useState('');
  const windoWidth = useWindowInnerWidth();
  const collapsed = useCollapsed();
  const setCollapsed = useSetCollapsed();

  useEffect(() => {
    const pageKey =
      Object.keys(RoutesUrls)[
        Object.values(RoutesUrls).indexOf(location.pathname.split('/').join('/') as any)
      ];

    if (pageKey) {
      setPageTitle(t(`cm:routes.${pageKey}`) as string);
    } else {
      const indexOfSupTitle = document.title.lastIndexOf('|');
      setPageTitle(document.title.slice(0, indexOfSupTitle));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.title, location.pathname]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const TitleHead = () => <p className="text-[18px] text-bold text-primary">Админ панель</p>;

  return (
    <Header>
      {windoWidth > 768 ? (
        <TitleHead />
      ) : (
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-5">
            {/*<Logo collased={false} />*/}
            <TitleHead />
          </div>
          <div onClick={handleCollapse} className="cursor-pointer flex items-center">
            <MenuIcon />
          </div>
        </div>
      )}
    </Header>
  );
};
