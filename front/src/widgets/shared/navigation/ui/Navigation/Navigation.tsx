import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

import { useCollapsed, useSetCollapsed } from '~features/shared/collapse';
import { useSetUser } from '~entities/shared/user';
import { useTranslation } from '~shared/lib/i18n';
import { RoutesUrls } from '~shared/lib/router';
import {
  FileIcon,
  LogoutIcon,
  NewsIcon,
  Sider,
  SiderButton,
  SiderSettingsButton,
  UsersIcon,
  useWindowInnerWidth,
} from '~shared/ui';
import { INavTabItem } from '~widgets/shared/navigation/ui/types';

export interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
  const { t } = useTranslation();
  const collapsedAtom = useCollapsed();
  const setCollapsed = useSetCollapsed();
  const windowWidth = useWindowInnerWidth();
  const navigate = useNavigate();
  const setUser = useSetUser();

  useEffect(() => {
    if (windowWidth <= 768) {
      if (collapsedAtom) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [collapsedAtom, windowWidth]);

  const routes: INavTabItem[] = [
    {
      title: 'Новости',
      path: RoutesUrls.adminPanelNews,
      icon: <NewsIcon />,
      isTabBar: true,
    },
    {
      title: 'Баннеры',
      path: RoutesUrls.adminPanelBanner,
      icon: <FileIcon />,
      isTabBar: true,
    },
  ];

  const settingsRoutes: INavTabItem[] = [
    {
      title: 'Выход',
      path: RoutesUrls.root,
      icon: <LogoutIcon />,
      isBlank: false,
    },
  ];

  const handleClickButton = () => {
    if (windowWidth <= 768) {
      setCollapsed(!collapsedAtom);
    }
  };

  const handleLogout = useCallback(() => {
    setUser({ authState: null });
    Cookies.remove('authToken');
    navigate(RoutesUrls.login);
  }, [navigate, setUser]);

  return (
    <>
      <Sider
        routes={routes.map((item) => {
          return (
            <SiderButton
              key={item.path}
              path={item.path}
              title={item.title}
              icon={item.icon}
              collapsed={collapsedAtom}
              onClick={handleClickButton}
            />
          );
        })}
        links={null}
        settings={settingsRoutes.map((item) => {
          return (
            <SiderSettingsButton
              key={item.path}
              path={item.path}
              title={item.title}
              icon={item.icon}
              isBlank={item.isBlank}
              collapsed={collapsedAtom}
              onClick={handleLogout}
            />
          );
        })}
        collapsed={collapsedAtom}
      />
    </>
  );
};
