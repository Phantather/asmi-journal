import Cookies from 'js-cookie';

import { Navigate, Outlet, useLocation } from 'react-router';

interface RequireAuthProps {
  loginPath: string;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ loginPath }) => {
  const location = useLocation();

  const isAuth = () => {
    const token = Cookies.get('authToken');

    return Boolean(token); // Проверяем наличие токена
  };

  if (!isAuth()) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
