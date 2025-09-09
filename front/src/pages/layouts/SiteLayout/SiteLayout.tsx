import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { SiteFooter } from '~widgets/shared/site-footer';
import { SiteHeader } from '~widgets/shared/site-header';

import logo from '~shared/assets/logo.svg';

export interface SiteLayoutProps extends Partial<ComponentWithChildren> {}

export const SiteLayout: FC<SiteLayoutProps> = () => {
  return (
    <>
      {/*<div className=" max-w-[1200px] w-full mx-auto px-5 flex flex-col items-center justify-center h-[100vh]">*/}
      {/*  <img src={logo} alt="HYUNDAI KG" className="w-[100px]" />*/}
      {/*  <h1 className="text-2xl md:text-3xl font-semibold mb-4 mt-5">*/}
      {/*    Техническое обслуживание 🔧*/}
      {/*  </h1>*/}
      {/*  <p className="text-gray-600 mb-8 text-center w-1/2 text-[18px]">*/}
      {/*    В данный момент мы проводим плановые технические работы для улучшения работы сайта.*/}
      {/*    Приносим извинения за временные неудобства. Пожалуйста, вернитесь чуть позже.*/}
      {/*  </p>*/}
      {/*</div>*/}
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
};
