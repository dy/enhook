# enhook

Enable hooks for a function via react/preact or other hooks provider, available in deps.

```js
import hooked from 'enhook'
import { useState, useEffect } from 'preact/hooks'

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

## Examples

Functional custom elements (aka [haunted](https://ghub.io/haunted)/[remount](https://ghub.io/remount))

```js
import hooked from 'enhook'
import { html, render } from 'lit-html'

function MyComponent () {
  render(html`Hello, ${ this.username }`, this)
}

customElements.define('my-component', class { constructor () { hooked(MyComponent).call(this) } })
```
