import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '~widgets/shared/app-header';
import { Navigation } from '~widgets/shared/navigation';

import { PageLayout } from '~shared/ui';

export interface BaseLayoutProps extends Partial<ComponentWithChildren> {}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <PageLayout navigation={<Navigation />} header={<AppHeader />}>
      {children}
      <Outlet />
    </PageLayout>
  );
};
