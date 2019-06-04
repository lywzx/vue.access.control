import MiddlewareInterface from '../interface/MiddlewareInterface';

export default class MiddlewareHandle implements MiddlewareInterface {
  protected args: any[] = [];

  protected _isOptional: boolean = false;

  protected _isInTerminal: boolean = false;

  public constructor() {
    let handle = this.handle;
    this.handle = function(next: Function, ...arg: any[]) {
      let args = [next];
      args.push.apply(args, this.args);
      args.push.apply(args, arg);
      handle.apply(this, args);
    };
  }

  public clearArgs() {
    this.args = [];
    return this;
  }

  public handle(...args: any[]): any {}

  public isOptional(): boolean {
    return this._isOptional;
  }

  public isTerminal(): boolean {
    return this._isInTerminal;
  }

  public optional(optional: boolean = true) {
    this._isOptional = optional;
    return this;
  }

  public setArgs(args: any[]) {
    this.args = args;
    return this;
  }

  public terminal(terminal: boolean = true) {
    this._isInTerminal = terminal;
    return this;
  }
}
