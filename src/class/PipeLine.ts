import PipeLineInterface from '../interface/PipeLineInterface';
import { isString, trim } from 'lodash';
import { assert } from '../util';
import MiddlewareInterface from '../interface/MiddlewareInterface';
import RouterMiddleware from '../router/RouterMiddleware';

export default class PipeLine implements PipeLineInterface {
  /**
   * running status
   */
  private running: boolean = false;

  /**
   *
   */
  private command: MiddlewareInterface[] = [];

  /**
   *
   */
  private args: any[] = [];

  public via() {
    return this;
  }

  public send(...args: any[]) {
    this.args = args;
    return this;
  }

  public then(callback?: Function): void | Promise<any[]> {
    let command = this.command;
    let args = this.args;

    let next: Function;
    if (callback) {
      next = function(...arg: any[]): void {
        if (command.length) {
          let current: MiddlewareInterface = command.shift() as MiddlewareInterface;
          current.handle(next, ...args, ...arg);
        } else {
          callback(...arg);
        }
      };
    } else {
      next = function(...arg: any[]): Promise<any> {
        if (command.length) {
          let current: MiddlewareInterface = command.shift() as MiddlewareInterface;

          // @ts-ignore
          return Promise.resolve(current.handle(...args, ...arg)).then(next);
          //return next().then(spread(next));
          //return Promise.resolve(current.handle(next, ...arg));
        } else {
          return Promise.resolve(arg[0]);
        }
      };
    }

    return next();
  }

  /**
   * @param middleWares
   * @param terminal
   */
  public through(middleWares: (string | MiddlewareInterface)[], terminal: boolean = true) {
    let existsMiddleWares = RouterMiddleware.middleWares;
    this.command = middleWares.map(middle => {
      if (!isString(middle)) {
        return middle;
      }
      let [fnName, fnArgString] = middle.split(':');
      let isOptional = fnName.substr(-1) === '?';
      fnName = isOptional ? fnName.substring(0, fnName.length - 1) : fnName;
      let fnArgs = isString(fnArgString)
        ? fnArgString.split(',').map(function(item) {
            let result: any = trim(item);
            if (['true', 'false'].indexOf(result.toLowerCase()) !== -1) {
              result = Boolean(result);
            }
            return result;
          })
        : [];

      if (existsMiddleWares[fnName]) {
        let middle: MiddlewareInterface = existsMiddleWares[fnName];
        if (isOptional) {
          middle.optional();
        }
        return middle
          .terminal(terminal)
          .clearArgs()
          .setArgs(fnArgs);
      }

      assert(false, `middleware name: ${fnName} not defined, please call RouterMiddleware:extend define '${fnName}'`);
    }) as MiddlewareInterface[];

    return this;
  }
}
