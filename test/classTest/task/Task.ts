import MiddlewareInterface from '../../../src/interface/MiddlewareInterface';

export default class Task implements MiddlewareInterface {
  public clearArgs() {
    return this;
  }

  public handle(next: Function, ...args: any) {
    next(true);
  }

  public isOptional(): boolean {
    return true;
  }

  public isTerminal(): boolean {
    return false;
  }

  public optional(optional?: boolean) {
    return this;
  }

  public setArgs(args: any[]) {
    return this;
  }

  public terminal(terminal: boolean) {
    return this;
  }
}
