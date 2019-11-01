const cache = new WeakMap

let doc = typeof document !== 'undefined' ? document : null

export default function enhook(fn) {
  if (cache.has(fn)) return cache.get(fn)

  let { h, render, enhook } = this

  // direct call, as in augmentor/tng-hooks case`
  if (enhook) return enhook(fn)

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

  return enhookedFunction

  function enhookedFunction(...args) {
    let result
    render(h(() => (result = fn.call(this, ...args), null)), holder)

    return result
  }
}
