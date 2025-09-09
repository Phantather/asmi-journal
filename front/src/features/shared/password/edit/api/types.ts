export interface ApiPasswordUpdateData {
  oldPassword: string;
  newPassword: string;
}
export interface ApiPasswordUpdateResponseData {
  data?: boolean;
  error?: boolean;
}
