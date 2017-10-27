/**
 *******************************************************************************
 * Copyright 2017-present Jonathan Barronville <jonathan@belairlabs.com>       *
 *                                                                             *
 * Licensed under the Apache License, Version 2.0 (the "License");             *
 * you may not use this file except in compliance with the License.            *
 * You may obtain a copy of the License at                                     *
 *                                                                             *
 *     http://www.apache.org/licenses/LICENSE-2.0                              *
 *                                                                             *
 * Unless required by applicable law or agreed to in writing, software         *
 * distributed under the License is distributed on an "AS IS" BASIS,           *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.    *
 * See the License for the specific language governing permissions and         *
 * limitations under the License.                                              *
 *******************************************************************************
 */

import * as ImmutableQueue from '../src/index'

test('`ImmutableQueue.create(…)` creates a queue.', () => {
  const q001 = ImmutableQueue.create<string>()
  expect(ImmutableQueue.size<string>(q001)).toBe(0)
  const q002 = ImmutableQueue.enqueue<string>(q001, 'foo')
  expect(ImmutableQueue.size<string>(q002)).toBe(1)
  const [q003, e] = ImmutableQueue.dequeue<string>(q002)
  expect(e).toBe('foo')
  expect(ImmutableQueue.size<string>(q003)).toBe(0)
})

test('`ImmutableQueue.createFrom(…)` creates a queue from an iterable.', () => {
  const a = [1, 2, 3]
  const iterable = (function* () {
    for (let value of a) {
      yield value
    }
  })()
  const q001 = ImmutableQueue.createFrom<number>(iterable)
  expect(ImmutableQueue.size<number>(q001)).toBe(3)
  const [q002, e001] = ImmutableQueue.dequeue<number>(q001)
  expect(e001).toBe(1)
  const [q003, e002] = ImmutableQueue.dequeue<number>(q002)
  expect(e002).toBe(2)
  const [q004, e003] = ImmutableQueue.dequeue<number>(q003)
  expect(e003).toBe(3)
  const [q005, e004] = ImmutableQueue.dequeue<number>(q004)
  expect(e004).toBeUndefined()
  expect(ImmutableQueue.size<number>(q005)).toBe(0)
})

test('`ImmutableQueue.enqueue(…)` adds elements to a queue.', () => {
  let q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  q = ImmutableQueue.enqueue<number>(q, 1)
  expect(ImmutableQueue.size<number>(q)).toBe(1)
})

test('`ImmutableQueue.dequeue(…)` removes elements from a queue.', () => {
  let q001 = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q001)).toBe(0)
  let qSize = 0
  for (let i = 0; i < 10; i++) {
    q001 = ImmutableQueue.enqueue<number>(q001, i)
    qSize++
    expect(ImmutableQueue.size<number>(q001)).toBe(qSize)
  }
  expect(ImmutableQueue.size<number>(q001)).toBe(qSize)
  let q002 = q001
  while (! ImmutableQueue.isEmpty<number>(q002)) {
    let _value: (number | undefined)
    [q002, _value] = ImmutableQueue.dequeue<number>(q002)
  }
  expect(ImmutableQueue.size<number>(q002)).toBe(0)
})

test('`ImmutableQueue.clear(…)` empties a queue.', () => {
  let q001 = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q001)).toBe(0)
  let qSize = 0
  for (let i = 0; i < 25; i++) {
    q001 = ImmutableQueue.enqueue<number>(q001, i)
    qSize++
    expect(ImmutableQueue.size<number>(q001)).toBe(qSize)
  }
  expect(ImmutableQueue.size<number>(q001)).toBe(qSize)
  q001 = ImmutableQueue.clear<number>(q001)
  expect(ImmutableQueue.size<number>(q001)).toBe(0)
})

test('`ImmutableQueue.isEmpty(…)` returns the emptiness status of a queue.', () => {
  let q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.isEmpty<number>(q)).toBe(true)
  for (let i = 0; i < 5; i++) {
    q = ImmutableQueue.enqueue<number>(q, i)
  }
  expect(ImmutableQueue.isEmpty<number>(q)).toBe(false)
  q = ImmutableQueue.clear<number>(q)
  expect(ImmutableQueue.isEmpty<number>(q)).toBe(true)
})

test('`ImmutableQueue.size(…)` returns the size of a queue.', () => {
  let q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  for (let i = 0; i < 5; i++) {
    q = ImmutableQueue.enqueue<number>(q, i)
  }
  expect(ImmutableQueue.size<number>(q)).toBe(5)
  q = ImmutableQueue.clear<number>(q)
  expect(ImmutableQueue.size<number>(q)).toBe(0)
})

test('`ImmutableQueue.createIterator(…)` creates an iterator for a queue.', () => {
  let q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  for (let i = 0; i < 25; i++) {
    q = ImmutableQueue.enqueue<number>(q, i)
  }
  expect(ImmutableQueue.size<number>(q)).toBe(25)
  const iterator = ImmutableQueue.createIterator<number>(q)
  let i = 0
  for (let value of iterator) {
    expect(value).toBe(i)
    i++
  }
})
