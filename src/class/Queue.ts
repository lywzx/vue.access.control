import PipeLine from './PipeLine';
import MiddlewareInterface from '../interface/MiddlewareInterface';

export default class Queue extends PipeLine {
  /**
   * running status
   */
  private running: boolean = false;

  /**
   * get queue running status
   * @return boolean
   */
  public isRunning(): boolean {
    return this.running;
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
      this.through(args).then(() => {
        this.running = false;
      });
    }
  }
}
