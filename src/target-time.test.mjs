import { strict as assert } from 'node:assert';
import { mock, test, describe } from 'node:test';

import TargetTime from './target-time.mjs';

describe('Date helper', () => {
  const oneMinuteInMilliseconds = 1000 * 60;
  const hundredAntTwentyInMilliseconds = oneMinuteInMilliseconds * 120;

  test('TargetTime has to be defined', () => {
    assert(TargetTime)
  })

  test('given 120 minutes, toString should return 120:00', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
  })

  test('given 120 minutes and 1 second passes, toString should return 119:59', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(1000);
    assert.deepStrictEqual(target.toString(), '119:59')
  })

  test('given 120 minutes and 59 second passes, toString should return 119:00', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(1000 * 59);
    assert.deepStrictEqual(target.toString(), '119:01')
  })

  test('given 120 minutes and 120 minutes passes, toString should return 00:00', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(hundredAntTwentyInMilliseconds);
    assert.deepStrictEqual(target.toString(), '00:00')
  })

  test('given 120 minutes and 120 minutes and 1 second passes, toString should return +00:01', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(hundredAntTwentyInMilliseconds + 1000);
    assert.deepStrictEqual(target.toString(), '+00:01')
  })

  test('given 120 minutes and 120 minutes and 1 minute and 1 second passes, toString should return +01:01', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(hundredAntTwentyInMilliseconds + 1000 * 61);
    assert.deepStrictEqual(target.toString(), '+01:01')
  })

  test('given 120 minutes and 120 minutes and 1 minute and 29 seconds passes, toString should return +01:29', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(hundredAntTwentyInMilliseconds + 1000 * 60 + 1000 * 27);
    assert.deepStrictEqual(target.toString(), '+01:27')
  })

  test('given 120 minutes and 120 minutes and 1 minute and 59 seconds passes, toString should return +01:59', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(hundredAntTwentyInMilliseconds + 1000 * 60 + 1000 * 59);
    assert.deepStrictEqual(target.toString(), '+01:59')
  })

  test('given 120 minutes and 122 minutes passes, toString should return +02:00', (context) => {
    context.mock.timers.enable();
    const target = new TargetTime(120);
    assert.deepStrictEqual(target.toString(), '120:00');
    context.mock.timers.tick(hundredAntTwentyInMilliseconds + 1000 * 60 * 2);
    assert.deepStrictEqual(target.toString(), '+02:00')
  })

  test('given more than a day in minutes, should throw when creating a new object', (context) => {
    assert.throws(
      () => {
        new TargetTime(60 * 24 + 1)
      }
    )
  })
})