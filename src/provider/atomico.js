// as per https://github.com/atomicojs/atomico/issues/15
let enhook, lib
try { lib = require('atomico') } catch (e) { }
if (lib) {

  enhook = (fn) => {
    let hooks = lib.createHookCollection(render)
    return render
    function render (props) {
      hooks.load(fn, props)
      hooks.updated()
    }
  }
}

module.exports = { enhook }
