import Task from './Task';

export default class Task4 extends Task {
  public handle(next: Function, lastFist: number | void, lastSecond: number | void, lastThird: number | void) {
    return Promise.resolve([
      lastFist ? lastFist + 1 : 1,
      lastSecond ? lastSecond + 1 : 1,
      lastThird ? lastThird + 1 : 1,
    ]);
  }
}
