export default interface MiddlewareInterface {
  optional(): MiddlewareInterface;
  clearArgs(): MiddlewareInterface;
  setArgs(...args: any[]): MiddlewareInterface;
  handle(...args: any[]): any;
}
