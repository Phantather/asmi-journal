import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiYearData } from './types';

export const getYear = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiYearData>>(routes.getYear());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
