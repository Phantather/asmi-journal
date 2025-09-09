export enum RoleType {
  ministry = 'ministry',
  supervisor = 'supervisor',
  employee = 'employee',
  organization = 'organization',
}
export interface User {
  type: number;
  s: string;
  n: string;
  p: string | null;
  pin: string | number;
  org: number;
  role: RoleType[];
  exp: number;
  okpo: string;
  orgTypeId: number;
}
