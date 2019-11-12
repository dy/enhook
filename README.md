# enhook [![Build Status](https://travis-ci.org/dy/enhook.svg?branch=master)](https://travis-ci.org/dy/enhook) [![unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)](http://github.com/badges/stability-badges)

Enable react/preact/∀ hooks everywhere.

[![NPM](https://nodei.co/npm/enhook.png?mini=true)](https://nodei.co/npm/enhook/)

```js
import enableHooks, { useState, useEffect } from 'enhook'

let countFrom = enableHooks(initCount => {
  let [count, setCount] = useState(initCount)

  setTimeout(() => {
    setCount(++count)
  }, 1000)

  // any side-effects
  useEffect(() => console.log(count), [count])
})

countFrom(0)
```

_Enhook_ turns any function into reactive function with enabled hooks. Unlike [augmentor](https://ghub.io/augmentor) or similar standalone hooks provider, enhook uses installed framework hooks. The framework is detected in the following order:

* [`preact`](https://ghub.io/preact)
* [`react`](https://ghub.io/react)
* [`haunted`](https://ghub.io/haunted)
* [`rax`](https://ghub.io/rax)
* [`augmentor`](https://ghub.io/augmentor)
* [`tng-hooks`](https://ghub.io/tng-hooks) (manual call API)
<!-- * [`atomico`](https://ghub.io/atomico) -->
<!-- * [`fn-with-hooks`](https://ghub.io/fn-with-hooks) (manual call API) -->


Target lib hooks can also be used directly as:

```js
import enableRaxHooks, { useState, useEffect } from 'enhook/rax'

let reactiveFn = enableRaxHooks(init => /* ...reactive code */)
```

Custom hooks provider can be registered as:

```js
import { render, h, useState, useEffect } from 'red-lights'
import enhook from 'enhook'

let enableHooks = enhook.bind({ render, h })
let reactiveFn = enableHooks(init => /* ... */)
```

## Supported hooks

                        | React | Preact | Rax | Haunted | Augmentor | TNG-hooks
 ---|---|---|---|---|---
 `useState`             | ✅    | ✅    | ✅ | ✅      | ✅        | ✅
 `useEffect`            | ✅    | ✅    | ✅ | ✅      | ✅        | ✅
 `useContext`           | ✅    | ✅    | ✅ | ✅      | ✅*       | ❌
 `useReducer`           | ✅    | ✅    | ✅ | ✅      | ✅        | ✅
 `useCallback`          | ✅    | ✅    | ✅ | ✅      | ✅        | ✅
 `useMemo`              | ✅    | ✅    | ✅ | ✅      | ✅        | ✅
 `useRef`               | ✅    | ✅    | ✅ | ✅      | ✅        | ✅
 `useImperativeHandle`  | ✅    | ✅    | ✅ | ❌      | ❌        | ❌
 `useLayoutEffect`      | ✅    | ✅    | ✅ | ✅      | ✅        | ❌
 <!-- `useDebugValue` | -->
 <!-- `useProp` | -->


## Use-cases

### 1. React/preact hooks anywhere

Organize non-DOM reactions with existing react hooks.

```js
import hooked from 'enhook'
import { useRoute } from 'wouter'

let observeRoute = hooked((route, callback) => {
  const [match, params] = useRoute(route)
  if (match) {
    callback(params)
    return params
  }
})

observeRoute('/user/:id', ({ id }) => {})
observeRoute('/org/:id', ({ id }) => {})
```

### 2. Functional custom elements

Make function-controlled custom elements à la [haunted](https://ghub.io/haunted) or [remount](https://ghub.io/remount).

```js
import hooked from 'enhook'
import { html, render } from 'lit-html'
import useSWR from 'swr'

function MyComponent () {
  let { data, error } = useSWR('/api/user', fetch)

  // renderer can be any, not necessary lit-html
  if (error) return render(html`Failed to load`, this)
  if (!data) return render(html`Loading...`, this)

  render(html`Hello, ${ data.name }`, this)
}

customElements.define('my-component', class { constructor () { hooked(MyComponent).call(this) } })
```

### 3. Methods with hooks

Make class methods support hooks, even react components themselves.

```js
import hooked from 'enhook'
import { Component } from 'react'

class MyComponent extends Component {
  // can be implemented as @hooked decorator
  render() {
    let [count, setCount] = useState(0)
    setTimeout(() => setCount(++count), 1000)
    return <>{ count }</>
  }
}
MyComponent.prototype.render = hooked(MyComponent.prototype.render)
```

### 4. [wait for it]
<!--
### 4. Functional components reactive framework

Hyperscript with functional components would look like:

```js
// nanoreact.js
import htm from 'htm'
import hooky from 'enhook'
import morph from 'nanomorph'
import h from 'hyperscript'
import { usePrev } from 'nanohook'

const html = htm.bind((tag, props, ...children) => {
  if (typeof tag === 'function') return hooky(props => {
    return morph(prev, tag(props))
  })({ children, ...props })

  return h(tag, props, ...children)
})

const render = (what, where) => morph(where, what)

export { html, render }
```

```js
// app.js
import { useState, useEffect, html, render } from './nanoreact'

function CounterApp () {
  let [count, setCount] = useState(0)

  return html`<div>${ count }</div>`
}

render(html`<${CounterApp}/>`, document.getElementById('app'))
``` -->


### 5. Stream / observable / async iterators etc.

```js
import hooked, { useEffect } from 'enhook'

let observable = new Observable(hooked(observer => {
  // ...calculating code

  useEffect(() => {
    // push changes into observable
    observer.next(deps)
  }, deps)

  return () => {} // destruct
})
```

## See also

* [remorph](https://github.com/dy/remorph) - react/preact-based DOM morphing.

## Similar art

* [augmentor](https://ghub.io/augmentor) - react-less fast hooks implementation.
* [tng-hooks](https://ghub.io/tng-hooks) - another react-inspired hooks library, not compatible with react.
* [fn-with-hooks](https://ghub.io/fn-with-hooks) - tng hooks inspired hooks library.

<!-- * [any-observable](https://ghub.io/any-observable) -  -->

## License

MIT

<p align="right">HK</p>
