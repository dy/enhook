import t from 'tape'
import { frame, time, tick } from 'wait-please'
import enhook from '.'
import setHooks, { useEffect, useState, useMemo, useLayoutEffect, current } from 'any-hooks'


async function testContextArgs(t) {
  let log = []

  function f(props) {
    log.push(this)
    log.push(props)

    let res = useState(0)
    let [count, setCount] = res
    log.push(['call', count])

    useEffect(() => {
      setCount(1)
    }, [])
  }

  let f1 = enhook(f)

  f1.call({ foo: 1 }, { bar: 2 })
  t.deepEqual(log, [{ foo: 1 }, { bar: 2 }, ['call', 0]], 'context args init')

  // not sure why preact prefers 3 frames
  await frame(4)

  t.deepEqual(log, [{ foo: 1 }, { bar: 2 }, ['call', 0], { foo: 1 }, { bar: 2 }, ['call', 1]], 'context args after')
}

async function testOrder(t) {
  let log1 = [], log2 = []
  let f = (i, log) => {
    log.push('call', i)
    useEffect(() => {
      log.push('effect', i)
    }, [])
  }
  let f1 = enhook(f)
  let f2 = enhook(f)

  f1(1, log1)
  f2(2, log2)

  // generic tester, since effects order is not guaranteed across frameworks
  await frame(3)
  t.deepEqual(log1, ['call', 1, 'effect', 1], 'order 1')
  t.deepEqual(log2, ['call', 2, 'effect', 2], 'order 2')
}

async function testPassive(t) {
  let log = []

  let fn = enhook(() => {
    let [count, setCount] = useState(0)
    log.push(count)
    if (log.length < 10) setCount(1)
  }, { passive: true })
  fn()
  t.deepEqual(log, [0], 'passive mode: first')

  await frame(2)
  fn()
  await frame(2)

  t.deepEqual(log, [0, 1], 'passive mode: second')
}

async function testRecursion(t) {
  let count = 0

  let f = enhook(() => {
    let [c, setC] = useState(0)
    count++
    setC(c => ++c)
  })
  f()
  await time(200)
  t.ok(count < 50, 'prevent recursion')
}

t('auto', async t => {
  setHooks()
  await testContextArgs(t)
  await testOrder(t)
  // await testPassive(t)
  // await testRecursion(t)
  t.end()
})

t('preact', async t => {
  setHooks('preact')
  await testContextArgs(t)
  await testOrder(t)
  await testPassive(t)
  // await testRecursion(t)
  t.end()
})

t('augmentor', async t => {
  setHooks('augmentor')
  await testContextArgs(t)
  await testOrder(t)
  await testPassive(t)
  // await testRecursion(t)
  t.end()
})
t('rax', async t => {
  setHooks('rax')
  await testContextArgs(t)
  await testOrder(t)
  await testPassive(t)
  // await testRecursion(t)
  t.end()
})
t('haunted', async t => {
  setHooks('haunted')
  await testContextArgs(t)
  await testOrder(t)
  await testPassive(t)
  // await testRecursion(t)
  t.end()
})
t('atomico', async t => {
  setHooks('atomico')
  await testContextArgs(t)
  await testOrder(t)
  await testPassive(t)
  // await testRecursion(t)
  t.end()
})
t('react', async t => {
  setHooks('react')
  await testContextArgs(t)
  await testOrder(t)
  // await testPassive(t)
  // await testRecursion(t)
  t.end()
})
// setHooks('tng-hooks')
// setHooks('dom-augmentor')
// setHooks('neverland')
// setHooks('fuco')
// setHooks('fn-with-hooks')

t('survival', async t => {
  setHooks('augmentor')

  let count = 0
  let f = enhook(() => {
    useEffect(() => {
      count++
    })
  })
  let N = 1e4
  for (let i = N; i--;) { f() }

  await frame(3)

  t.is(count, N)

  t.end()
})
