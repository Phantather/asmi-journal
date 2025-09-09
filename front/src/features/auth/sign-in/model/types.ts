import { ApiSignInResponseData } from '../api/types';

export interface SignInFormValues {
  login: string;
  password: string;
}

export interface SignInData extends ApiSignInResponseData {}
