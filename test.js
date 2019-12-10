import t from 'tape'
import { frame, time, tick } from 'wait-please'
import enhook from '.'
import setHooks, { useEffect, useState, useMemo, useLayoutEffect, current } from 'any-hooks'

async function testHooks (t) {
  t.test('context & args', async t => {
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
    await frame(3)

    t.deepEqual(log, [{ foo: 1 }, { bar: 2 }, ['call', 0], { foo: 1 }, { bar: 2 }, ['call', 1]])

    t.end()
  })

  t.test('order & separate stack', async t => {
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
}

t('basics', async t => {
  await testHooks(t)
  t.end()
})

t('preact', async t => {
  setHooks('preact')
  await testHooks(t)
  t.end()
})

t('react', async t => {
  setHooks('react')
  await testHooks(t)
  t.end()
})

t('rax', async t => {
  setHooks('rax')
  await testHooks(t)
  t.end()
})

t('augmentor', async t => {
  setHooks('augmentor')
  await testHooks(t)
  t.end()
})

t.skip('dom-augmentor', async t => {
  setHooks('dom-augmentor')
  await testHooks(t)
  t.end()
})

t.skip('neverland', async t => {
  setHooks('neverland')
  await testHooks(t)
  t.end()
})

t.skip('fuco', async t => {
  setHooks('fuco')
  await testHooks(t)
  t.end()
})

t('haunted', async t => {
  setHooks('haunted')
  await testHooks(t)
  t.end()
})

t('atomico', async t => {
  setHooks('atomico')
  await testHooks(t)
  t.end()
})

// FIXME: has a bit diverging API
t.skip('tng', async t => {
  setHooks('tng-hooks')
  await testHooks(t)
  t.end()
})

// FIXME: has a bit diverging API
t.skip('fn-with-hooks', async t => {
  setHooks('fn-with-hooks')
  await testHooks(t)
  t.end()
})

t.skip('Example 1', t => {
  // TODO
})


t('survival', async t => {
  setHooks('preact')

  let count = 0
  let f = enhook(
    () => useEffect(() => {count++})
  )
  let N = 1e6
  for (let i = N; i--;) { f() }

  await frame(3)

  t.is(count, N)

  t.end()
})
