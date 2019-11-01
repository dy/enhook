import t from 'tape'
import hook, { useState, useEffect } from '.'
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

t('basics', async t => {
  let hooks = await
  let log = []

  let f = hook(function (props) {
    log.push(this)
    log.push(props)
  })
})

t('Example 1', t => {

})
