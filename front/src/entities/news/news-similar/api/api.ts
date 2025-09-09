import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiNewsSimilarData, INewsSimilarParams } from './types';

export const getNewsSimilar = async (params: INewsSimilarParams) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiNewsSimilarData>>(
      routes.getNewsSimilar(params.title || '', params.id)
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
