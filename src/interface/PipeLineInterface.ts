export default interface PipeLineInterface {
  via(): PipeLineInterface;

  send(...args: any[]): PipeLineInterface;

  through(middleWares: string[]): PipeLineInterface;

  then(callback?: Function): void | Promise<any>;

  handleBreak?(res: any): boolean;
}
