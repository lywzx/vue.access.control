import { Role } from '@lywzx/access.control/dist/types/Role';

export default interface AccessUserOptions {
  roles: Role[];
  permissions: string[];
  userId?: number;
}
