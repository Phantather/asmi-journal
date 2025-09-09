import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiMainFileData } from './types';

export const getMainFile = async () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiMainFileData>>(routes.getMainFile());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
