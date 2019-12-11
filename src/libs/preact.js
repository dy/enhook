let hooker = require('../enhook')
let lib, h, render, enhook

try { lib = require('preact') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
  enhook = hooker.bind({ h, render })
}

module.exports = enhook

