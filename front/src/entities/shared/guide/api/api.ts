import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiGuideData } from './types';

export const getGuide = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiGuideData>>(routes.getGuide());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
