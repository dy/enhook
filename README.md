# enhook [![Build Status](https://travis-ci.org/unihooks/enhook.svg?branch=master)](https://travis-ci.org/unihooks/enhook) [![unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)](http://github.com/badges/stability-badges)

Enable react/preact/∀ hooks for regular functions.

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

_Enhook_ turns any function into reactive function with enabled hooks. Unlike [augmentor](https://ghub.io/augmentor) or similar standalone hooks providers, enhook uses installed framework hooks. The framework is detected from the list:

* [`react`](https://ghub.io/react)
* [`preact`](https://ghub.io/preact)
* [`rax`](https://ghub.io/rax)
* [`haunted`](https://ghub.io/haunted)
* [`augmentor`](https://ghub.io/augmentor)
* [`dom-augmentor`](https://ghub.io/dom-augmentor)
* [`neverland`](https://ghub.io/neverland)
* [`atomico`](https://ghub.io/atomico)
* [`fuco`](https://ghub.io/fuco)
* [`tng-hooks`](https://ghub.io/tng-hooks) (non-reactive)
* [`fn-with-hooks`](https://ghub.io/fn-with-hooks) (non-reactive)


Custom hooks provider can be set as:

```js
import enhook from 'enhook'

enhook.use('preact')

// custom enhook function
enhook.use(require('augmentor').contextual)

// custom vdom with hooks
enhook.use({ render, h })

// auto detection
enhook.use(null)
```


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

See [any-hooks](https://ghub.io/any-hooks) for aliasing react, in case if react is not installed.

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

Make class methods support hooks, even react components themselves, like [react-universal-hooks](https://ghub.io/react-universal-hooks).

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

* [unihooks](https://github.com/unihooks/unihooks) - unified all-framework essential hooks collection.
* [any-hooks](https://github.com/unihooks/any-hooks) - resolve and get installed hooks.
* [remorph](https://github.com/dy/remorph) - react/preact-based DOM morphing.

## Similar art

* [augmentor](https://ghub.io/augmentor) - react-less fast hooks implementation.
* [tng-hooks](https://ghub.io/tng-hooks) - another react-inspired hooks library, not compatible with react.
* [fn-with-hooks](https://ghub.io/fn-with-hooks) - tng hooks inspired hooks library.

## License

MIT

<p align="right">HK</p>
