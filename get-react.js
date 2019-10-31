// FIXME: must be assured that es modules version works synchronously
// FIXME: move to a separate package, like any-react
let h, render

let lib

try { lib = require('preact') } catch (e) {}
if (lib) {
  h = lib.h
  render = lib.render
}

if (!lib) {
  try { lib = require('preact/compat') } catch (e) {}
  if (lib) {
    h = lib.createElement
    render = lib.render
  }
}

if (!lib) {
  try { lib = require('react') } catch (e) {}
  if (lib) {
    h = lib.createElement
    // FIXME: possible react without react-dom
    render = tryRequire('react-dom').render
  }
}

if (!lib) {
  try { lib = require('augmentor') } catch (e) {}
  if (lib) {
    h => fn => fn
    render = (_) => lib(_())
  }
}

export { h, render }
