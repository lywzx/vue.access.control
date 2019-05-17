import 'mocha';
import { expect } from 'chai';
import PipeLine from '../../src/class/PipeLine';

describe('PipeLine Test', function() {
  it('should be return PipeLine instance', function() {
    let fn1 = function(next: Function) {
      setTimeout(next, 100, 1);
    };
    expect(new PipeLine([fn1])).to.instanceOf(PipeLine);
  });

  it('get result with sync data', function() {
    let fn1 = function(next: Function) {
      setTimeout(
        function() {
          debugger;
          console.log(1);
          next(1);
        },
        100,
        1
      );
    };
    let fn2 = function(next: Function) {
      setTimeout(
        function() {
          debugger;
          console.log(2);
          next(2);
        },
        1500,
        1
      );
    };
    let fn3 = function(next: Function) {
      setTimeout(next, 200, 1);
    };
    let pipeLine = new PipeLine([fn1, fn2, fn3]);

    pipeLine.pipe(function(result: any) {
      expect(result).to.be.equal(1);
    });
  });
});
