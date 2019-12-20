import hooker from '../enhook.js'

let lib, h, render, enhook, hooks

try { lib = require('preact'); hooks = require('preact/hooks') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
  enhook = hooker.bind({ h, render })
  enhook.useState = hooks.useState
}

export default enhook

