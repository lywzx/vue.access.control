import AccessUserOptions from './AccessUserOptions';

export default interface AccessVmData {
  key: string;
  userOptions: AccessUserOptions;
  extendData: Record<string, any>;
}
