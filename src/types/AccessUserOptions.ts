import { Role } from '@lywzx/access.control/dist/types/Role';

export default interface AccessUserOptions {
  roles: Role[];
  permissions: string[];
  userId?: number;
  isLogin: boolean | undefined; // login flag, `true` user is login, `false` user is not login,
  // `undefined` user not sure login or not login
  extendData?: any;
}
