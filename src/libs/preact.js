let hooker = require('../enhook')
let lib, h, render, unrender, enhook

try { lib = require('preact') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
  enhook = hooker.bind({ h, render })
}

module.exports = enhook

