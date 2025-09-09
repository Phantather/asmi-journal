import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiFilePriceData, IFilePriceParams } from './types';

export const getFilePrice = async (params: IFilePriceParams) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiFilePriceData>>(
      routes.getFilePrice(params?.id_vehicle)
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
