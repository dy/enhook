import { h, render } from './get-react'

const cache = new WeakMap

export default function enhook (fn) {
  let _h = h, _render = render
  try {
    if (!_h) _h = this.h
    if (!_render) _render = this.render
  } catch (e) {
    throw Error('`{ render, h }` must be provided either via installed react/preact/etc or via enhook.bind({ render, h }).')
  }

  // FIXME: cache by the fn
  if (cache.has(fn)) return cache.get(fn)

  // FIXME: cache by last stacktrace entry

  // minimal dom-node compatible stub required by react libs
  let stub = {
    nodeType: 1,
    firstChild: null,
    tagName: 'div',
    lastChild: null,
    childNodes: [],
    ownerSVGElement: null,
    namespaceURI: "http://www.w3.org/1999/xhtml"
  }

  return function hooked () {
    _render(_h(() => (fn.call(this), null)), stub)
  }
}
