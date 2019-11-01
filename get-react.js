// FIXME: must be assured that es modules version works synchronously
// FIXME: move to a separate package, like any-react
let h, render, hooks

let lib

try { lib = require('preact') } catch (e) {}
if (lib) {
  h = lib.h
  render = lib.render

  hooks = require('preact/hooks')
}

if (!lib) {
  try { lib = require('preact/compat') } catch (e) {}
  if (lib) {
    h = lib.createElement
    render = lib.render

    hooks = require('preact/hooks')
  }
}

if (!lib) {
  try { lib = require('react') } catch (e) {}
  if (lib) {
    h = lib.createElement
    // FIXME: possible react without react-dom
    render = tryRequire('react-dom').render

    hooks = lib
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
