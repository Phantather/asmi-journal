import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiSettingsData } from './types';

export const getSettings = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiSettingsData>>(routes.getSettings());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
