import Task from './Task';

export default class Task5 extends Task {
  public handle(next: Function, lastValue: number | void) {
    next(lastValue ? lastValue + 1 : 1);
  }
}
