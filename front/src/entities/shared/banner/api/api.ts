import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiBannerData } from './types';

export const getBanner = async () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiBannerData>>(routes.getBanner());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
