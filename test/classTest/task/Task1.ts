import Task from './Task';

export default class Task1 extends Task {
  public handle(next: Function, lastValue: number | void) {
    setTimeout(next, 0, lastValue ? lastValue + 1 : 1);
  }
}
