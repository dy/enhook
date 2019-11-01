let render, h, hooks

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  let augmentor = lib.default
  h = fn => fn
  render = (what, where) => augmentor(what)
  hooks = lib
}

export { render, h, hooks }
