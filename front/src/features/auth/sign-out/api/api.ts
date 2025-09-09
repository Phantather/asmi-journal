import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiSignOutResponseData } from './types';

// for example purposes
export const signOut = () => {
  let response;

  try {
    api
      .post<any, ApiResponseData<ApiSignOutResponseData>>(routes.signOut(), {})
      .then(() => window.location.reload());
  } catch (error: any) {
    response = error?.response?.data;
    localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
    localStorage.removeItem(import.meta.env.VITE_TOKEN_TTL);
  }

  return response;
};
