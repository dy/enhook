const cache = new WeakMap

let doc = typeof document !== 'undefined' ? document : null

export default function enhook(fn) {
  if (cache.has(fn)) return cache.get(fn)

  let { h, render } = this

  // FIXME: cache by last stacktrace entry

  // minimal dom-node compatible stub required by react-like libs
  let holder = !doc ? {
    nodeType: 1,
    firstChild: null,
    tagName: 'div',
    lastChild: null,
    childNodes: [],
    ownerSVGElement: null,
    namespaceURI: "http://www.w3.org/1999/xhtml",
    appendChild: () => {},
    replaceChild: () => {}
  } : document.createDocumentFragment()

  cache.set(fn, enhookedFunction)

  let currentResult

  function Component ({ args, ctx }) {
    currentResult = fn.call(ctx, ...args)
    return null
  }

  function enhookedFunction(...args) {
    let prevResult = currentResult
    render(h(Component, { ctx: this, args }), holder)
    let result = currentResult
    currentResult = prevResult
    return result
  }

  return enhookedFunction
}
