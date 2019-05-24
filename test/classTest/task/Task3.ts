import Task from './Task';

export default class Task1 extends Task {
  public handle(next: Function, lastFist: number | void, lastSecond: number | void, lastThird: number | void) {
    next(lastFist ? lastFist + 1 : 1, lastSecond ? lastSecond + 1 : 1, lastThird ? lastThird + 1 : 1);
  }
}
