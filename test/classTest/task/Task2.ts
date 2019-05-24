import Task from './Task';

export default class Task2 extends Task {
  public handle(next: Function, lastValue: any) {
    return Promise.resolve([lastValue ? lastValue + 1 : 1]);
  }
}
