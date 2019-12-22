import enhook from './enhook.js'

export default function enhookReact() {
  let [lib, dom] = this
  return enhook.apply({ render: dom.render, h: lib.createElement }, arguments)
}
