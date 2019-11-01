import { h, render } from './get-react'


let _h = h, _render = render

try {
  if (!_h) _h = this.h
  if (!_render) _render = this.render
} catch (e) {
  throw Error('`{ render, h }` must be provided either via installed react/preact/etc or via enhook.bind({ render, h }).')
}
