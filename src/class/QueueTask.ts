import MiddlewareInterface from '../interface/MiddlewareInterface';

export default class QueueTask implements MiddlewareInterface {

  public clearArgs() {
    return this;
  }

  public handle(...args: any[]): any {

  }

  public isOptional(): boolean {
    return false;
  }

  public isTerminal(): boolean {
    return false;
  }

  public optional(optional?: boolean) {
    return this;
  }

  public setArgs(args: any[]): QueueTask {
    return this;
  }

  public terminal(terminal: boolean): QueueTask {
    return this;
  }
}
