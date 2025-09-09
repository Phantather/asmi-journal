import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

import { useSetUser } from '~entities/shared/user';
import { SignOutView, SignOutViewProps } from '~features/auth/sign-out';
import { RoutesUrls } from '~shared/lib/router';

export interface LogoutPageProps {}

export const LogoutPage: React.FC<LogoutPageProps> = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const handleSignOut: SignOutViewProps['onSignOut'] = useCallback(() => {
    setUser({ authState: null });
    Cookies.remove('authToken');
    navigate(RoutesUrls.login);
  }, [navigate]);

  handleSignOut();

  return null;
};
