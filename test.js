import t from 'tape'
import { frame, time, tick } from 'wait-please'
import enhook from '.'
import setHooks, { useEffect, useState, useMemo, useLayoutEffect, current } from 'any-hooks'


async function testHooks (name='') {
  setHooks(name)

  t(name + ': context & args', async t => {
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
    t.deepEqual(log, [{ foo: 1 }, { bar: 2 }, ['call', 0]])

    // not sure why preact prefers 3 frames
    await frame(4)

    t.deepEqual(log, [{ foo: 1 }, { bar: 2 }, ['call', 0], { foo: 1 }, { bar: 2 }, ['call', 1]])

    t.end()
  })

  t(name + ': order & separate stack', async t => {
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
    t.deepEqual(log1, ['call', 1, 'effect', 1])
    t.deepEqual(log2, ['call', 2, 'effect', 2])

    t.end()
  })

  t(name + ': passive fn', async t => {
    t.plan(2)
    let log = []

    let fn = enhook(() => {
      let [count, setCount] = useState(0)
      log.push(count)
      if (log.length < 10) setCount(1)
    }, { passive: true })
    fn()
    t.deepEqual(log, [0], 'first')

    await frame(2)
    fn()
    await frame(2)

    t.deepEqual(log, [0, 1], 'second')

    t.end()
  })

  t.skip(name + ': prevent recursion', async t => {
    let count = 0

    let f = enhook(() => {
      let [c, setC] = useState(0)
      count++
      setC(c => ++c)
    })
    f()
    await time(200)
    t.is(count, 50)

    t.end()
  })
}

testHooks()
testHooks('preact')
testHooks('augmentor')
testHooks('react')
testHooks('rax')
testHooks('haunted')
testHooks('atomico')

// testHooks('tng-hooks')
// testHooks('dom-augmentor')
// testHooks('neverland')
// testHooks('fuco')
// testHooks('fn-with-hooks')

t('survival', async t => {
  setHooks('preact')

  let count = 0
  let f = enhook(() => {
    useEffect(() => {
      count++
    })
  })
  let N = 1e3
  for (let i = N; i--;) { f() }

  await frame(3)

  t.ok(count >= 1)

  t.end()
})
