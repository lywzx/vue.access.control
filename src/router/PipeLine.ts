import {
  clone
} from 'lodash';

export default class PipeLine {

  /**
   * is break
   * @type {boolean}
   */
  protected break = false;

  /**
   * 
   */
  private buildMethod: Function;

  public constructor(public funs: Function[]){
    this.buildMethod = this.pipeFn();
  }

  private pipeFn() {
    let funs: Function[] = this.funs;
    return function(funcs: any[], scope: any) {
      return function() {
        (function next() {
              if(funcs.length > 0) {
                  funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
              }
        })();
      };
    }
  }

  public pipe(to: any, from: any): void {
    this.buildMethod();
  }

}
