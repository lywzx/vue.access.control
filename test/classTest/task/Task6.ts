import Task from './Task';

export default class Task6 extends Task {
  public handle(next: Function, lastValue: { run: number }) {
    lastValue.run++
    next(lastValue);
  }
}
