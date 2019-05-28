export default interface PipeLineInterface {
  via(): PipeLineInterface;

  send(...args: any[]): PipeLineInterface;

  through(middleWares: string[], terminal?: boolean, injected?: any[]): PipeLineInterface;

  run(): Promise<any>;
  run(callback: Function): void;

  whenBreak?(...res: any): boolean;
}
