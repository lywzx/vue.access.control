import { RawLocation } from 'vue-router/types/router';

export default interface AccessOptions {
  foreignKeyName: string;
  notLoginRoleName: string;
  loginRoute?: RawLocation;
  vueRouter?: boolean;
}
