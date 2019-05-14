
export function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`[vue.access.control] ${msg}`);
}
