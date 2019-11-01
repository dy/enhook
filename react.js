let h, render, hooks

try { lib = require('react') } catch (e) { }
if (lib) {
  h = lib.createElement
  hooks = lib
}

try { renderer = require('react-dom') } catch (e) { }
if (renderer) render = renderer.render
else {
  let Renderer
  try { Renderer = require('react-test-renderer/shallow') } catch (e) {}
  if (Renderer) {
    renderer = new Renderer()
    render = (what, where) => renderer.render(what)
  }
}


export { h, render, hooks }
