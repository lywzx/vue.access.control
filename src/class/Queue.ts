import PipeLine from './PipeLine';
import MiddlewareInterface from '../interface/MiddlewareInterface';

export default class Queue extends PipeLine {
  protected running: boolean = false;

  /**
   * get queue running status
   * @return boolean
   */
  public isRunning(): boolean {
    return this.running;
  }

  /**
   * won't be break
   */
  public whenBreak(): boolean {
    return false;
  }

  /**
   * add command to queue
   * @param args
   */
  public addCommand(...args: MiddlewareInterface[]) {
    if (this.isRunning()) {
      this.command.push(...args);
    } else {
      this.running = true;
      this.through(args).run(() => {
        this.running = false;
      });
    }
  }
}
