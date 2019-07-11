import isFunction from 'lodash/isFunction';
import trim from 'lodash/trim';

export function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`[vue.access.control] ${msg}`);
}

export function isPromiseLike(item: any): boolean {
  return item && isFunction(item.then);
}

export function stringToArrayArgs(arg: string) {
  return arg.split(',').map(function(item) {
    let result: any = trim(item);
    if (['true', 'false'].indexOf(result.toLowerCase()) !== -1) {
      result = result.toLowerCase() === 'true';
    }
    return result;
  });
}
