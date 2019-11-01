import t from 'tape'
import { idle, frame } from 'wait-please'

// import { useState } from 'preact/hooks'
// import { h, render } from 'preact'
// import { createElement as h, useState } from 'react'
// import { render } from 'react-dom'
// import { render, createElement as h } from 'rax'


// let f = hook((init) => {
//   let [ count, setCount ] = useState(0)
//   console.log(count)
//   setTimeout(() => {
//     setCount(++count)
//   }, 1000)
// })(0)

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

  await frame(4)

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

t.skip('Example 1', t => {
  // TODO
})
