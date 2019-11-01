# enhook [![Build Status](https://travis-ci.org/dy/enhook.svg?branch=master)](https://travis-ci.org/dy/enhook) [![unstable](https://img.shields.io/badge/stability-experimental-yellow.svg)](http://github.com/badges/stability-badges)

Enable react/preact hooks anywhere.

[![NPM](https://nodei.co/npm/enhook.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/enhook/)

```js
import hooked, { useState, useEffect } from 'enhook'

let countFrom = hooked(initCount => {
  let [count, setCount] = useState(initCount)

  setTimeout(() => {
    setCount(++count)
  }, 1000)

  // any side-effects
  useEffect(() => console.log(count), [count])
})

countFrom(0)
```

Enhook turns any function into hooks-enabled.

Hook providers are detected in the following order:

* [preact](https://ghub.io/preact)
* [react](https://ghub.io/react)
* [react-test-renderer](https://ghub.io/react)
* [rax](https://ghub.io/rax)
* [augmentor](https://ghub.io/augmentor)


Optionally, target lib entry can be used directly as:

```js
import enableRaxHooks, { useState, useEffect } from 'enhook/rax'
```

Custom hooks provider can be registered as:

```js
import { render, h, useState, useEffect } from 'red-lights-framework'
import enhook from 'enhook/register'

let enableHooks = enhook.bind({ render, h })

let counter = enableHooks(init => {
  let [count, setCount] = useState(init)
  useEffect(() => setTimeout(() => setCount(++count), 1000), [count])
})

counter(1)
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


## Similar art

* [augmentor](https://ghub.io/augmentor) - react-like hooks, react-incompatible.
<!-- * [any-observable](https://ghub.io/any-observable) -  -->


## License

MIT

<p align="right">HK</p>
