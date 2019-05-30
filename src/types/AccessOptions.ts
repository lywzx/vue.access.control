import { RawLocation } from 'vue-router/types/router';

export default interface AccessOptions {
  foreignKeyName: string;
  notLoginRoleName: string;
  vueRouter?: boolean;
  globalMiddleware?: string[];
  defaultRoute?: RawLocation;
  loginRoute?: RawLocation;
  permissionDenyRedirectRoute?: RawLocation;
}
