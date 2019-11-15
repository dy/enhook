import t from 'tape'
import { frame, time, tick } from 'wait-please'

// import { TNG, useState } from 'tng-hooks'
// import hooked, { useState } from '.'
// let f = hooked((init) => {
//   let [ count, setCount ] = useState(0)
//   setTimeout(() => {
//     console.log(count)
//     setCount(++count)
//   }, 1000)
// })
// f(0)


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

  t.test('order of calls', async t => {
    let log = []
    let f = (i) => {
      log.push('call', i)
      useEffect(() => {log.push('effect', i)})
    }
    let f1 = enhook(f)
    let f2 = enhook(f)

    f1(1)
    f2(2)

    t.deepEqual(log, ['call', 1, 'call', 2])
    await frame(3)
    t.deepEqual(log, ['call', 1, 'call', 2, 'effect', 1, 'effect', 2])

    t.end()
  })
}

t('basics', async t => {
  let hooks = await import('./index.js')
  await testHooks(hooks, t)
  t.end()
})

t.only('react', async t => {
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
