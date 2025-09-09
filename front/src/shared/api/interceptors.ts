import { RoutesUrls } from '~shared/lib/router';

import { ApiError, ApiRequestConfig, ApiResponse } from './types';

const LOGIN_PAGE = `/${import.meta.env.VITE_BASE}/login`;
const API_ROOT = `/${import.meta.env.VITE_BASE}/api`;
const CHECK_AUTH_API = `${API_ROOT}/auth/check`;

export const errorHandler = (err: ApiError) => {
  console.error('[Error handler]:');
  console.error(err);

  if (err.response?.status === 401) {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
    localStorage.removeItem(import.meta.env.VITE_TOKEN_TTL);

    const isAuthCheckAPI = String(err.config.url).includes(CHECK_AUTH_API);
    const path = window.location.pathname;

    if (!path.startsWith(RoutesUrls.cabinet)) {
      console.log('ok');
    } else if (isAuthCheckAPI) {
      window.location.replace(LOGIN_PAGE);
    } else {
      window.location.replace(LOGIN_PAGE);
    }
  }

  return Promise.reject(err);
};

export const requestHandler = (config: ApiRequestConfig) => {
  const headers = config.headers || {};
  const tokenValue = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
  const tokenTTL = localStorage.getItem(import.meta.env.VITE_TOKEN_TTL);

  if (tokenValue && tokenTTL) {
    if (new Date(JSON.parse(tokenTTL)) > new Date()) {
      headers.Authorization = JSON.parse(tokenValue);
    }
  }

  return { ...config, headers };
};

export const createAuthenticatedRequestHandler = (token: string) => (config: ApiRequestConfig) => {
  const headers = config.headers || {};

  headers.Authorization = token;

  return { ...config, headers };
};

export const responseHandler = (res: ApiResponse) => {
  return res.data;
};
