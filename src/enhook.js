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
  // stub = new Proxy(document.createElement('div'), { get(target, name) { console.log(target[name]); return target[name] } })
  // stub = document.createDocumentFragment()

  cache.set(fn, enhookedFunction)

  return enhookedFunction

  function enhookedFunction(...args) {
    let result

    render(h(() => {
      result = fn.call(this, ...args)
      return null
    }), holder)

    return result
  }
}
