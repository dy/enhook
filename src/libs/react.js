let hooker = require('../enhook')
let h, render, enhook
let lib
try { lib = require('react') } catch (e) { }
if (lib) {
  h = lib.createElement
}

let renderer
try { renderer = require('react-dom') } catch (e) { }
if (renderer) render = renderer.render

if (lib) enhook = function (fn) {
  return hooker.call({ h, render }, fn)
}

module.exports = enhook

