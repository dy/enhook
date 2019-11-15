import t from 'tape'
import { frame, time, tick } from 'wait-please'


async function testHooks (hooks, t) {
  let enhook = hooks.default
  let { useEffect, useState, useMemo, useLayoutEffect } = hooks

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
  let hooks = await import('./index.js')
  await testHooks(hooks, t)
  t.end()
})

t('react', async t => {
  let hooks = await import('./react.js')
  await testHooks(hooks, t)
  t.end()
})

t('preact', async t => {
  let hooks = await import('./preact.js')
  await testHooks(hooks, t)
  t.end()
})

t('rax', async t => {
  let hooks = await import('./rax.js')
  await testHooks(hooks, t)
  t.end()
})

t('augmentor', async t => {
  let hooks = await import('./augmentor.js')
  await testHooks(hooks, t)
  t.end()
})

t('haunted', async t => {
  let hooks = await import('./haunted.js')
  await testHooks(hooks, t)
  t.end()
})

t('atomico', async t => {
  let hooks = await import('./atomico.js')
  await testHooks(hooks, t)
  t.end()
})

// FIXME: has a bit diverging API
t.skip('tng', async t => {
  let hooks = await import('./tng-hooks.js')
  await testHooks(hooks, t)
  t.end()
})

t.skip('Example 1', t => {
  // TODO
})

function idle(n=1) {
  return new Promise(ok => {
    let count = 0
    f()
    function f() {
      if (count === n) return ok()
      count++
      setImmediate(f)
    }
  })
}

t('survival', async t => {
  let { default: hooked, useEffect } = await import('./preact.js')

  let count = 0
  let f = hooked(
    () => useEffect(() => {count++})
  )
  let N = 1e6
  for (let i = N; i--;) { f() }

  await frame(3)

  t.is(count, N)

  t.end()
})
