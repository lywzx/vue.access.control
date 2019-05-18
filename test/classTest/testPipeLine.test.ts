import 'mocha';
import { expect } from 'chai';
import PipeLine from '../../src/class/PipeLine';


describe('PipeLine Test', function(): void {
  it('should be return PipeLine instance', function() {
    expect(new PipeLine()).to.instanceOf(PipeLine);
  });

  it('get result with sync data', function(done) {
    let task1 = {
      handle(next: Function, last?: number) {
        let result = last ? last + 1 : 1;
        if (typeof next === 'function') {
          return next(result);
        }
        return result;
      },
      clearArgs() {
        return this;
      },
      setArgs(...args: any[]) {
        return this;
      },
    };
    let task2 = {
      handle(next: Function, last?: number) {
        let result = last ? last + 1 : 1;
        if (typeof next === 'function') {
          return next(result);
        }
        return result;
      },
      clearArgs() {
        return this;
      },
      setArgs(...args: any[]) {
        return this;
      },
    };
    let task3 = {
      handle(next: Function, last?: number) {
        let result = last ? last + 1 : 1;
        if (typeof next === 'function') {
          return next(result);
        }
        return result;
      },
      clearArgs() {
        return this;
      },
      setArgs(...args: any[]) {
        return this;
      },
    };
    let pipeLine = new PipeLine();

    /*pipeLine.through([task1, task2, task3]).then(function(result: any) {
      expect(result).to.equal(3);
    });*/

    pipeLine
      .send(null)
      .through([task1, task2, task3])
      .then()
      // @ts-ignore
      .then(function(result: number) {
        expect(result).to.equal(4);
        done();
      });
  });
});
