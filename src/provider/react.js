let h, render, useState, useEffect, useMemo

let lib
try { lib = require('react') } catch (e) { }
if (lib) {
  h = lib.createElement
  useEffect = lib.useEffect
  useState = lib.useState
  useMemo = lib.useMemo
}

let renderer
try { renderer = require('react-dom') } catch (e) { }
if (renderer) render = renderer.render
// else {
  // let Renderer
  // try { Renderer = require('react-test-renderer/shallow') } catch (e) {}
  // if (Renderer) {
  //   renderer = new Renderer()
  //   render = (what, where) => renderer.render(what)
  // }
// }


export { h, render, useEffect, useMemo, useState }
