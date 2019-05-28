import PipeLine from '../class/PipeLine';

export default class RouterMiddlewarePipeline extends PipeLine {
  public whenBreak(args: any): boolean {
    return args !== undefined;
  }
}
