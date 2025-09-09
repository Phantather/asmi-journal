import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiClassData } from './types';

export const getClass = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiClassData>>(routes.getClass());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
