import PipeLineInterface from '../interface/PipeLineInterface';
import isString from 'lodash/isString';
import trim from 'lodash/trim';
import isFunction from 'lodash/isFunction';
import { assert, isPromiseLike } from '../util';
import MiddlewareInterface from '../interface/MiddlewareInterface';

export default class PipeLine implements PipeLineInterface {
  [x: string]: any;

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

  /**
   * @param args
   */
  public send(...args: any[]) {
    this.args = args;
    return this;
  }

  public run(): Promise<any[]>;
  public run(callback: Function): void;
  public run(callback?: Function): void | Promise<any[]> {
    let that = this;
    let command = that.command;
    let args = that.args;

    let returnType = isFunction(callback) ? 'common' : 'promise';
    let queueWithPromiseOrCallback = function(...result: any[]): Promise<any[]> | void {
      if (that.whenBreak) {
        if (that.whenBreak(...result)) {
          command = [];
          that.command = [];
        }
      }
      if (command.length) {
        let current = command.shift() as MiddlewareInterface;
        let ret;
        if (returnType === 'promise') {
          ret = new Promise(function(resolve, reject) {
            let res = current.handle(function(...result: any[]) {
              resolve(result);
            }, ...result);
            if (isPromiseLike(res)) {
              res
                .then(function(resultWithPromise: any[]) {
                  resolve(resultWithPromise);
                })
                .catch(reject);
            }
          });
        } else {
          ret = current.handle(queueWithPromiseOrCallback, ...result);
        }
        if (isPromiseLike(ret)) {
          returnType = 'promise';
          return ret.then(function(res: any[]) {
            return queueWithPromiseOrCallback(...res);
          });
        }
      } else {
        if (isFunction(callback)) {
          callback(...result);
        } else {
          return Promise.resolve(result);
        }
      }
    };

    return queueWithPromiseOrCallback(...args);
  }

  /**
   * @param middleWares
   * @param terminal
   * @param injected
   */
  public through(middleWares: (string | MiddlewareInterface)[], terminal: boolean = true, injected: any[] = []) {
    let existsMiddleWares = this.existsCommand;
    this.command = middleWares.map(middle => {
      if (!isString(middle)) {
        if (injected.length && 'prePendArgs' in middle) {
          // @ts-ignore
          middle.prePendArgs(injected);
        } else {
          middle.clearArgs().setArgs(injected);
        }
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
          .setArgs(injected.concat(fnArgs));
      }

      assert(false, `middleware name: ${fnName} not defined, please call RouterMiddleware:extend define '${fnName}'`);
    }) as MiddlewareInterface[];

    return this;
  }
}
