import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiPasswordUpdateData, ApiPasswordUpdateResponseData } from './types';

export const updatePassword = async (data: ApiPasswordUpdateData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiPasswordUpdateResponseData>>(
      routes.updatePassword(),
      data
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
