let hooker = require('../enhook')
let lib, h, render, enhook

try { lib = require('preact') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
  enhook = (fn) => hooker.call({ h, render }, fn)
}

module.exports = enhook

