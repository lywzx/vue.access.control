export default interface MiddlewareInterface {
  terminal(terminal: boolean): MiddlewareInterface;
  isTerminal(): boolean;
  optional(): MiddlewareInterface;
  clearArgs(): MiddlewareInterface;
  setArgs(...args: any[]): MiddlewareInterface;
  handle(...args: any[]): any;
}
