import React, { Suspense, lazy } from 'react';

import { Skeleton, Spin } from '~shared/ui';

function LoadingDisplay() {
  return (
    <div className="min-h-[60dvh] flex items-center justify-center">
      <Spin size="large">
        <Skeleton active />
      </Spin>
    </div>
  );
}

export const lazyLoader = (factory: () => Promise<{ default: React.ComponentType<any> }>) => {
  const Component = lazy(factory);

  return (props: any) => (
    <Suspense fallback={<LoadingDisplay />}>
      <Component {...props} />
    </Suspense>
  );
};
