import 'mocha';
import { expect, assert } from 'chai';
import { random, times, isArray, map } from 'lodash';
import PipeLine from '../../src/class/PipeLine';
import Task1 from './task/Task1';
import Task2 from './task/Task2';
import Task3 from './task/Task3';
import Task4 from './task/Task4';
import Task5 from './task/Task5';
import Task from './task/Task';
import Task6 from './task/Task6';

describe('PipeLine Test', function(): void {
  let createTask = function(init: any, length: number = 5, tasks: typeof Task[]): PipeLine {
    let pipeLine = new PipeLine();
    let taskList: Task[] = times(length, function() {
      let k = random(0, tasks.length);
      // @ts-ignore
      let task: typeof Task = tasks[k % tasks.length] as (typeof Task);
      // @ts-ignore
      return new task();
    });
    if (isArray(init)) {
      pipeLine.send(...init);
    } else {
      pipeLine.send(init);
    }
    return pipeLine.through(taskList);
  };

  it('should be return PipeLine instance', function() {
    expect(new PipeLine({})).to.instanceOf(PipeLine);
  });

  it('pipeline with sync callback', function(done) {
    createTask(100, 5, [Task5]).then(function(result: any) {
      expect(result).to.be.eq(105);
      done();
    });
  });

  it('pipeline with async callback', function(done) {
    this.timeout(5 * 1000);
    createTask(100, 15, [Task1]).then(function(result: any) {
      expect(result).to.be.eq(115);
      done();
    });
  });

  it('pipeline with sync and sync callback', function(done) {
    this.timeout(5 * 1000);
    createTask(100, 103, [Task1, Task5]).then(function(result: any) {
      expect(result).to.be.eq(203);
      done();
    });
  });

  it('pipeline with promise', function(done) {
    this.timeout(5000);
    let length = 199;
    (createTask(100, length, [Task2]).then() as Promise<any>)
      .then(function(result) {
        expect(result[0]).to.be.eq(length + 100);
        done();
      })
      .catch(err => done(err));
  });

  it('pipeline with callback and promise', function(done) {
    this.timeout(5000);

    let length = random(0, 150);
    (createTask(100, length, [Task2, Task1]).then() as Promise<any[]>)
      .then(function(result: any) {
        expect(result[0]).to.be.eq(length + 100);
        done();
      })
      .catch(err => done(err));
  });

  it('pipeline with multigroup callback value', function(done) {
    let length = 124;
    let initValue = [100, 109, 520];
    createTask(initValue, length, [Task3]).then(function(...result: number[]) {
      assert.deepEqual(result, map(initValue, item => item + length));
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

  it('pipeline with random call', function(done) {
    let cal: number[] = [];
    this.timeout(60 * 1000);
    let pipeList = times(random(10, 1000), function() {
      let length = random(0, 150);
      let init = random(0, 1000);
      cal.push(init + length);
      let task = createTask(init, length, [Task3, Task4]);
      return new Promise(function(resolve, reject) {
        task.then(function(result: any) {
          resolve(result);
        });
      });
    });

    Promise.all(pipeList)
      .then(function(result: any) {
        assert.deepEqual(result, cal);
        done();
      })
      .catch(err => done(err));
  });

  it('pipeline when task sync call, method should sync', function() {
    let pipeLine = new PipeLine();
    let params = {
      run: 1,
    };
    let length = random(0, 250);
    let result: any = null;
    pipeLine
      .send(params)
      .through(times(length, () => new Task6()))
      .then(function(res: { run: number }) {
        result = res;
      });

    if (result) {
      expect(params.run).to.be.eq(result.run);
    } else {
      assert.fail();
    }
  });
});
