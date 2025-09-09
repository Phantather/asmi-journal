import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiFileInfoData, IFileInfoParams } from './types';

export const getFileInfo = async (params: IFileInfoParams) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiFileInfoData>>(
      routes.getFileInfo(params?.id_vehicle)
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
