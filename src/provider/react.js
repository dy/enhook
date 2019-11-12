let h, render

let lib
try { lib = require('react') } catch (e) { }
if (lib) {
  h = lib.createElement
}

let renderer
try { renderer = require('react-dom') } catch (e) { }
if (renderer) render = renderer.render

export { h, render }
