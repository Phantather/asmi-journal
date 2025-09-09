import { api } from '~shared/api';

import { ApiSignInData, ApiSignInResponseData } from './types';
import { routes } from './routes';

export const signIn = async (data: ApiSignInData) => {
  try {
    const response = await api.post<ApiSignInResponseData>(routes.signIn(), {
      login: data.login,
      password: data.password,
    });

    return { data: response.data, error: false };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message || 'Sign-in failed',
    };
  }
};
