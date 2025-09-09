import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Menu, MenuProps } from 'antd';

import { RoutesUrls } from '~shared/lib/router';
import { DropDownIcon, Header, SiteLink, SiteLogo, useWindowInnerWidth } from '~shared/ui';
import { ModalHeaderContact } from '~shared/ui/data-display/ModalHeaderContact';
import { SetLocaleView, SetRegistrationView } from '~features/shared/locale';
import { useTranslation } from '~shared/lib/i18n';

type MenuItem = Required<MenuProps>['items'][number];

export interface SiteHeaderProps extends Partial<ComponentWithChild> {}

export const SiteHeader: FC<SiteHeaderProps> = () => {
  const { t } = useTranslation();
  const [carsListVisible, setCarsListVisible] = useState(false);
  const [serviceListVisible, setServiceListVisible] = useState(false);
  const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const windowWidth = useWindowInnerWidth();

  const header = () => {
    return (
      <div className="relative">
        <Header className="mx-auto relative">
          <div className="flex justify-between w-full items-center">
            <SiteLogo />
            <div className="flex items-center gap-[30px]">
              <SiteLink
                path={RoutesUrls.root}
                className="text-[16px] font-medium text-white"
                title={t('routes.home')}
              />
              <SiteLink
                path={RoutesUrls.about}
                className="text-[16px] font-medium text-white"
                title={t('routes.about')}
              />
            </div>
            <SetRegistrationView />
          </div>
        </Header>
      </div>
    );
  };

  const mobileHeader = () => {
    return (
      <div className="fixed top-0 w-full bg-primary z-20">
        <Header className="mx-auto">
          <div className="relative flex justify-between w-full items-center">
            <SiteLogo />
            <div className="flex items-center gap-5">
              <SetRegistrationView />
              <div
                onClick={() => setBurgerMenuVisible((prev) => !prev)}
                className={`burger-icon ${burgerMenuVisible ? 'open' : ''}`}
              >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
              </div>
            </div>
          </div>
          <div
            className={`fixed top-[70px] right-0 w-1/2 bg-primary h-[100vh] border border-solid border-white border-r-transparent border-t-transparent shadow-md p-5 z-10 transition-transform duration-300 ${
              burgerMenuVisible ? 'translate-x-0' : 'translate-x-[100%]'
            }`}
          >
            <div className="grid">
              <div className="flex flex-col items-center gap-[30px]">
                <SiteLink
                  path={RoutesUrls.specialOffer}
                  className="text-[16px] font-medium text-white"
                  title={t('routes.home')}
                />
                <SiteLink
                  path={RoutesUrls.about}
                  className="text-[16px] font-medium text-white"
                  title={t('routes.about')}
                />
              </div>
            </div>
          </div>
        </Header>
      </div>
    );
  };

  return <>{windowWidth > 991 ? header() : mobileHeader()}</>;
};
