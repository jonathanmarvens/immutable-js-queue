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
  const q = ImmutableQueue.create<string>()
  expect(ImmutableQueue.size<string>(q)).toBe(0)
  ImmutableQueue.enqueue<string>(q, 'foo')
  expect(ImmutableQueue.size<string>(q)).toBe(1)
  expect(ImmutableQueue.dequeue<string>(q)).toBe('foo')
  expect(ImmutableQueue.size<string>(q)).toBe(0)
})

test('`ImmutableQueue.createFrom(…)` creates a queue from an iterable.', () => {
  const a = [1, 2, 3]
  const iterable = (function* () {
    for (let value of a) {
      yield value
    }
  })()
  const q = ImmutableQueue.createFrom<number>(iterable)
  expect(ImmutableQueue.size<number>(q)).toBe(3)
  expect(ImmutableQueue.dequeue<number>(q)).toBe(1)
  expect(ImmutableQueue.dequeue<number>(q)).toBe(2)
  expect(ImmutableQueue.dequeue<number>(q)).toBe(3)
  expect(ImmutableQueue.dequeue<number>(q)).toBeUndefined()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
})

test('`ImmutableQueue.enqueue(…)` adds elements to a queue.', () => {
  const q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  ImmutableQueue.enqueue<number>(q, 1)
  expect(ImmutableQueue.size<number>(q)).toBe(1)
})

test('`ImmutableQueue.dequeue(…)` removes elements from a queue.', () => {
  const q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  let qSize = 0
  for (let i = 0; i < 10; i++) {
    ImmutableQueue.enqueue<number>(q, i)
    qSize++
    expect(ImmutableQueue.size<number>(q)).toBe(qSize)
  }
  expect(ImmutableQueue.size<number>(q)).toBe(qSize)
  while (! ImmutableQueue.isEmpty<number>(q)) {
    const _value = ImmutableQueue.dequeue<number>(q)
  }
  expect(ImmutableQueue.size<number>(q)).toBe(0)
})

test('`ImmutableQueue.clear(…)` empties a queue.', () => {
  const q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  let qSize = 0
  for (let i = 0; i < 25; i++) {
    ImmutableQueue.enqueue<number>(q, i)
    qSize++
    expect(ImmutableQueue.size<number>(q)).toBe(qSize)
  }
  expect(ImmutableQueue.size<number>(q)).toBe(qSize)
  ImmutableQueue.clear<number>(q)
  expect(ImmutableQueue.size<number>(q)).toBe(0)
})

test('`ImmutableQueue.isEmpty(…)` returns the emptiness status of a queue.', () => {
  const q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.isEmpty<number>(q)).toBe(true)
  for (let i = 0; i < 5; i++) {
    ImmutableQueue.enqueue<number>(q, i)
  }
  expect(ImmutableQueue.isEmpty<number>(q)).toBe(false)
  ImmutableQueue.clear<number>(q)
  expect(ImmutableQueue.isEmpty<number>(q)).toBe(true)
})

test('`ImmutableQueue.size(…)` returns the size of a queue.', () => {
  const q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  for (let i = 0; i < 5; i++) {
    ImmutableQueue.enqueue<number>(q, i)
  }
  expect(ImmutableQueue.size<number>(q)).toBe(5)
  ImmutableQueue.clear<number>(q)
  expect(ImmutableQueue.size<number>(q)).toBe(0)
})

test('`ImmutableQueue.createIterator(…)` creates an iterator for a queue.', () => {
  const q = ImmutableQueue.create<number>()
  expect(ImmutableQueue.size<number>(q)).toBe(0)
  for (let i = 0; i < 25; i++) {
    ImmutableQueue.enqueue<number>(q, i)
  }
  expect(ImmutableQueue.size<number>(q)).toBe(25)
  const iterator = ImmutableQueue.createIterator<number>(q)
  let i = 0
  for (let value of iterator) {
    expect(value).toBe(i)
    i++
  }
})
