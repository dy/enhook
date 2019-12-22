import enhook from './enhook.js'

export default function enhookRax () {
  let [lib, driver] = this
  let render = (what, where) => lib.render(what, where, { driver })
  return enhook.apply({ render, h: lib.createElement }, arguments)
}
