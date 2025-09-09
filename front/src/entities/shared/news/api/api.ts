import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiNewsData } from './types';

export const getNews = async (page: number, offset: number) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiNewsData>>(routes.getNews(), {
      params: { page, offset },
    });
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
