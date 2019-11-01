# unihooks [![Build Status](https://travis-ci.org/dy/unihooks.svg?branch=master)](https://travis-ci.org/dy/unihooks) [![unstable](https://img.shields.io/badge/stability-experimental-yellow.svg)](http://github.com/badges/stability-badges)

Enable react/preact hooks anywhere.

[![NPM](https://nodei.co/npm/unihooks.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/unihooks/)

```js
import enableHooks, { useState, useEffect } from 'unihooks'

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

_Unihooks_ turns any function into hooks-enabled.

Hook providers are detected in the following order:

* [preact](https://ghub.io/preact)
* [react](https://ghub.io/react)
* [react-test-renderer](https://ghub.io/react)
* [rax](https://ghub.io/rax)
* [augmentor](https://ghub.io/augmentor)


Optionally, target lib entry can be used directly as:

```js
import enableRaxHooks, { useState, useEffect } from 'unihooks/rax'
```

Custom hooks provider can be registered as:

```js
import { render, h, useState, useEffect } from 'red-lights-framework'
import unihooks from 'unihooks'

let hooked = unihooks.bind({ render, h })

let counter = hooked(init => {
  let [count, setCount] = useState(init)
  useEffect(() => setTimeout(() => setCount(++count), 1000), [count])
})

counter(1)
```


## Use-cases

### 1. React/preact hooks anywhere

Organize non-DOM reactions with existing react hooks.

```js
import hooked from 'unihooks'
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
import hooked from 'unihooks'
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
import hooked from 'unihooks'
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


## Similar art

* [augmentor](https://ghub.io/augmentor) - react-like hooks, react-incompatible.
<!-- * [any-observable](https://ghub.io/any-observable) -  -->


## License

MIT

<p align="right">HK</p>
