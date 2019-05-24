import PipeLineInterface from '../interface/PipeLineInterface';
import { isString, trim, isFunction, isArray } from 'lodash';
import { assert, isPromiseLike } from '../util';
import MiddlewareInterface from '../interface/MiddlewareInterface';

export default class PipeLine implements PipeLineInterface {
  public constructor(protected existsCommand?: Record<string, any>) {}
  /**
   *
   */
  protected command: MiddlewareInterface[] = [];

  /**
   *
   */
  protected args: any[] = [];

  public via() {
    return this;
  }

  public send(...args: any[]) {
    this.args = args;
    return this;
  }

  public handleBreak(result: any): boolean {
    return result === false;
  }

  public then(callback?: Function): void | Promise<any[]> {
    let command = this.command;
    let args = this.args;
    let next: Function;
    let self = this;
    next = function(...result: any[]): void | Promise<any[]> {
      let first = result && result[0];
      if ((self.handleBreak && self.handleBreak(result)) || !command.length) {
        if (isFunction(callback)) {
          return callback(...result);
        } else if (isPromiseLike(first)) {
          return first;
        } else {
          return Promise.resolve(result);
        }
      }

      let current: MiddlewareInterface = command.shift() as MiddlewareInterface;
      let ret = current.handle(next, ...result);

      if (isPromiseLike(ret)) {
        ret = ret.then(function(result: any) {
          if (isArray(result)) {
            return next(...result);
          }
          return next(result);
        });
      }

      if (isPromiseLike(first)) {
        return (first as Promise<any>).then(function() {
          return ret;
        });
      }
      return ret;
    };
    let ret = next(...args);
    if (isFunction(callback)) {
      return ret;
    }
    return Promise.resolve(ret);
  }

  /**
   * @param middleWares
   * @param terminal
   */
  public through(middleWares: (string | MiddlewareInterface)[], terminal: boolean = true) {
    let existsMiddleWares = this.existsCommand;
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
              result = result.toLowerCase() === 'true';
            }
            return result;
          })
        : [];

      if (existsMiddleWares && existsMiddleWares[fnName]) {
        let middle: MiddlewareInterface = new existsMiddleWares[fnName]();
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
