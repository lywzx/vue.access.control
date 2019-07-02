import { RoleTypes as Role } from '@lywzx/access.control/dist/typings/types/RoleTypes';

export default interface AccessUserOptions {
  roles: (string | Role)[];
  permissions: string[];
  userId?: number;
  isLogin: boolean | undefined; // login flag, `true` user is login, `false` user is not login,
  // `undefined` user not sure login or not login
  extendData?: any;
}
