import t from 'tape'
import { idle, frame, time } from 'wait-please'


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
  let { useEffect, useState, useMemo } = hooks

  let log = []

  let f = enhook(function (props) {
    log.push(this)
    log.push(props)

    let [count, setCount] = useState(0)
    log.push(count)

    useEffect(() => {
      setCount(1)
    }, [])
  })

  f.call({ foo: 1 }, { bar: 2 })
  t.deepEqual(log, [{ foo: 1 }, { bar: 2 }, 0])

  // not sure why preact prefers 3 frames
  await frame(3)

  t.deepEqual(log, [{ foo: 1 }, { bar: 2 }, 0, { foo: 1 }, { bar: 2 }, 1])
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

t.skip('tng', async t => {
  let hooks = await import('./tng.js')
  await testHooks(hooks, t)
  t.end()
})

t.skip('Example 1', t => {
  // TODO
})
