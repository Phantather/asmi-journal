import { User } from '~entities/shared/user';

export interface ApiSignInData {
  login: string;
  password: string;
}

export interface ApiSignInResponseData {
  token: string;
  expiresIn: number;
  tokenType: string;
  authState: User;
}
