import Cookies from 'js-cookie';

import { ApiResponseData, api } from '~shared/api';

import { ApiNewsData } from '~features/admin';

import { routes } from './routes';
import { ApiBannerData } from './types';

export const updateBanner = async (id: number, formData: FormData) => {
  const token = Cookies.get(`${import.meta.env.VITE_TOKEN_NAME}`);

  try {
    return await api.put<unknown, ApiResponseData<ApiBannerData>>(
      routes.updateBanner(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const createBanner = async (formData: FormData) => {
  const token = Cookies.get(`${import.meta.env.VITE_TOKEN_NAME}`);

  try {
    return await api.post<unknown, ApiResponseData<ApiBannerData>>(
      routes.createBanner(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const deleteBanner = async (id: number) => {
  const token = Cookies.get(`${import.meta.env.VITE_TOKEN_NAME}`);

  try {
    return await api.delete<unknown, ApiResponseData<ApiNewsData>>(routes.deleteBanner(id), {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};
