export enum ApiRoleType {
  ministry = 'ministry',
  printing_house = 'printing_house',
  supervisor = 'supervisor',
  employee = 'employee',
  rayono = 'rayono',
}
export interface ApiUserData {
  type: number;
  s: string;
  n: string;
  p: string | null;
  pin: string | number;
  org: number;
  role: ApiRoleType[];
  exp: number;
  okpo: string;
  orgTypeId: number;
}
