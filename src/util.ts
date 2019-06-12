import { isFunction } from 'lodash-es';

export function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`[vue.access.control] ${msg}`);
}

export function isPromiseLike(item: any): boolean {
  return item && isFunction(item.then);
}
