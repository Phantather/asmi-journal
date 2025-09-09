import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiNewsDetailData, INewsDetailParams } from './types';

export const getNewsDetail = async (params: INewsDetailParams) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiNewsDetailData>>(routes.getNewsDetail(params.id));
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
