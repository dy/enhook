let limit = require('./limit')
let doc = typeof document !== 'undefined' ? document : null


module.exports = function enhookRaw(fn, options = {}) {
  let { h, render } = this
  let { passive } = options

  fn = limit(fn)

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

  let currentResult, currentCtx, currentArgs = [], blocked

  function Component() {
    if (passive && blocked) return null
    if (passive) blocked = true
    currentResult = fn.apply(currentCtx, currentArgs)
    return null
  }

  function hookedFn(...args) {
    currentCtx = this
    currentArgs = args
    let prevResult = currentResult
    if (passive) blocked = false
    fn.count = 0
    render(h(Component), holder)
    let result = currentResult
    currentResult = prevResult
    return result
  }

  return hookedFn
}
