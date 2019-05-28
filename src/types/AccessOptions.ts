import { RawLocation } from 'vue-router/types/router';

export default interface AccessOptions {
  foreignKeyName: string;
  notLoginRoleName: string;
  defaultPage?: RawLocation;
  loginRoute?: RawLocation;
  vueRouter?: boolean;
  globalMiddleware?: string[];
}
