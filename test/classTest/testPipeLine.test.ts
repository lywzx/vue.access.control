import 'mocha';
import { expect, assert } from 'chai';
import PipeLine from '../../src/class/PipeLine';
import Task1 from './task/Task1';
import Task2 from './task/Task2';
import Task3 from './task/Task3';
import Task4 from './task/Task4';

describe('PipeLine Test', function(): void {
  it('should be return PipeLine instance', function() {
    expect(new PipeLine({})).to.instanceOf(PipeLine);
  });

  it('pipeline with callback', function(done) {
    let pipeLine = new PipeLine({});

    pipeLine
      .send(100)
      .through([new Task1(), new Task1(), new Task1(), new Task1()])
      .then(function(result: number) {
        expect(result).to.be.eq(104);
        done();
      });
  });

  it('pipeline with promise', function(done) {
    let pipeLine = new PipeLine({});

    (pipeLine
      .send(100)
      .through([new Task2(), new Task2(), new Task2(), new Task2()])
      .then() as Promise<any>).then(function(result: any) {
      expect(result[0]).to.be.eq(104);
      done();
    });
  });

  it('pipeline with callback and promise', function(done) {
    let pipeLine = new PipeLine({});

    pipeLine
      .send(100)
      .through([new Task1(), new Task2(), new Task1(), new Task2()])
      .then(function(result: number) {
        expect(result).to.be.eq(104);
        done();
      });
  });

  it('pipeline with multigroup callback value', function(done) {
    let pipeLine = new PipeLine();

    pipeLine
      .send(100, 102, 104)
      .through([new Task3(), new Task3(), new Task3(), new Task3()])
      .then(function(...result: any[]) {
        assert.deepEqual([104, 106, 108], result);
        done();
      });
  });

  it('pipeline with multigroup promise value', function(done) {
    let pipeLine = new PipeLine();

    pipeLine
      .send(100, 102, 104)
      .through([new Task4(), new Task4(), new Task4(), new Task4()])
      .then(function(...result: any[]) {
        assert.deepEqual([104, 106, 108], result);
        done();
      });
  });

  it('pipeline with multigroup promise and callback value', function(done) {
    let pipeLine = new PipeLine();

    (pipeLine
      .send(undefined, 102, 104)
      .through([new Task4(), new Task3(), new Task4(), new Task3()])
      .then() as Promise<any>).then(function(result: any[]) {
      assert.deepEqual([4, 106, 108], result);
      done();
    });
  });
});
