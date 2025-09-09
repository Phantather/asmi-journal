import { useRoutes } from 'react-router-dom';

import { BaseLayout, SiteLayout } from '~pages/layouts';
import { NotFoundPage } from '~pages/shared/not-found';
import { RequireAuth, RoutesUrls } from '~shared/lib/router';
import { lazyLoader } from '~shared/lib/utils';
import { LoginPage } from '~pages/shared/login';

const HomePage = lazyLoader(() =>
  import('~pages/shared/home').then((module) => ({
    default: module.HomePage,
  }))
);

const AboutPage = lazyLoader(() =>
  import('~pages/about').then((module) => ({
    default: module.AboutPage,
  }))
);

const NewsPage = lazyLoader(() =>
  import('~pages/news').then((module) => ({ default: module.NewsPage }))
);

const NewsDetailPage = lazyLoader(() =>
  import('~pages/news').then((module) => ({ default: module.NewsDetailPage }))
);

const AdminNewsPage = lazyLoader(() =>
  import('~pages/admin').then((module) => ({ default: module.AdminNewsPage }))
);

const AdminBannerPage = lazyLoader(() =>
  import('~pages/admin').then((module) => ({ default: module.AdminBannerPage }))
);

const LogoutPage = lazyLoader(() =>
  import('~pages/shared/logout').then((module) => ({ default: module.LogoutPage }))
);

const routes = [
  {
    path: RoutesUrls.root,
    element: <SiteLayout />,
    children: [
      { path: RoutesUrls.root, element: <HomePage /> },
      { path: RoutesUrls.about, element: <AboutPage /> },

      { path: RoutesUrls.news, element: <NewsPage /> },
      { path: RoutesUrls.newsDetail, element: <NewsDetailPage /> },
      { path: RoutesUrls.login, element: <LoginPage /> },
      { path: RoutesUrls.logout, element: <LogoutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: RoutesUrls.adminPanel,
    element: <RequireAuth loginPath={RoutesUrls.login} />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          { path: RoutesUrls.adminPanelNews, element: <AdminNewsPage /> },
          { path: RoutesUrls.adminPanelBanner, element: <AdminBannerPage /> },
        ],
      },
    ],
  },
];

export const Router = () => {
  const routeElement = useRoutes(routes);

  return routeElement;
};
