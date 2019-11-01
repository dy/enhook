let h, render, hooks

try { lib = require('preact') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
  hooks = require('preact/hooks')
}

export { h, render, hooks }
