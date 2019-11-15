let doc = typeof document !== 'undefined' ? document : null

module.exports = function enhook(fn) {
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
    appendChild: () => { },
    replaceChild: () => { }
  } : doc.createDocumentFragment()

  let currentResult, currentCtx, currentArgs = []

  function Component() {
    currentResult = fn.call(currentCtx, ...currentArgs)
    return null
  }
  function hookedFn(...args) {
    currentCtx = this
    currentArgs = args
    let prevResult = currentResult
    render(h(Component), holder)
    let result = currentResult
    currentResult = prevResult
    return result
  }

  return hookedFn
}
