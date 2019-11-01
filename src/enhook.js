const cache = new WeakMap

export default function enhook(fn) {
  if (cache.has(fn)) return cache.get(fn)

  let { h, render } = this

  // FIXME: cache by last stacktrace entry

  // minimal dom-node compatible stub required by react-like libs
  let stub = {
    nodeType: 1,
    firstChild: null,
    tagName: 'div',
    lastChild: null,
    childNodes: [],
    ownerSVGElement: null,
    namespaceURI: "http://www.w3.org/1999/xhtml"
  }

  cache.set(fn, hooked)

  return hooked

  function hooked(...args) {
    _render(_h(() => (fn.call(this, ...args), null)), stub)
  }
}
