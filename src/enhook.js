import queueMicrotask from 'queue-microtask'

let doc = typeof document !== 'undefined' ? document : null

let MAX_RERENDER = 25

module.exports = function enhookRaw(fn, options = {}) {
  let { h, render } = this
  let { passive } = options
  let count = 0

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
    appendChild() { },
    replaceChild() { }
  } : doc.createDocumentFragment()

  let currentResult, currentCtx, currentArgs = [], blocked, rendered

  function Component() {
    if (++count >= MAX_RERENDER) throw Error('More than ' + MAX_RERENDER + ' rerenders, likely there\'s infinite recursion')
    if (passive && blocked === fn) return null
    currentResult = fn.call(currentCtx, ...currentArgs)
    if (passive) blocked = fn
    if (!rendered) {
      rendered = true
      queueMicrotask(() => {
        rendered = false
        count = 0
      })
    }
    return null
  }

  function hookedFn(...args) {
    currentCtx = this
    currentArgs = args
    let prevResult = currentResult
    if (passive) blocked = null
    render(h(Component), holder)
    let result = currentResult
    currentResult = prevResult
    return result
  }

  return hookedFn
}
