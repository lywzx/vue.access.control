export default interface MiddlewareInterface {
  terminal(terminal: boolean): MiddlewareInterface;
  isTerminal(): boolean;
  isOptional(): boolean;
  optional(optional?: boolean): MiddlewareInterface;
  clearArgs(): MiddlewareInterface;
  setArgs(args: any[]): MiddlewareInterface;
  handle(...args: any[]): any;
}
