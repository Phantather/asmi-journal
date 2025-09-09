import React from 'react';

import { RoleType, useUser } from '~entities/shared/user';
import { NotFoundPage } from '~pages/shared/not-found';

export const withAccess =
  (allowedRoles: RoleType[]) =>
  <P extends Record<string, unknown>>(WrappedComponent: React.ComponentType<P>) => {
    const WithRole: React.FC<P> = (props) => {
      const user = useUser();

      if (!user || !allowedRoles.some((role: RoleType) => user.role.includes(role))) {
        return <NotFoundPage />;
      }

      return <WrappedComponent {...props} />;
    };

    return WithRole;
  };
