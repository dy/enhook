let h, render, lib

try { lib = require('preact') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
}

module.exports = { h, render }
