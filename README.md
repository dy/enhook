# enhook

Enable hooks for a function via react/preact/etc mechanics.

```js
import hooked from 'enhook'
import { useState, useEffect } from 'preact/hooks'
import { render, h } from 'preact'

let f = hooked(initCount => {
  let [count, setCount] = useState(initCount)

  setTimeout(() => {
    setCount(count++)
  }, 1000)

  // any side-effects
  useEffect(() => console.log(count), [count])
})

f(0)
```
