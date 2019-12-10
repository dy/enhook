// as per https://github.com/atomicojs/atomico/issues/15
let enhook, lib
try { lib = require('atomico') } catch (e) { }
if (lib) {
  enhook = (fn) => {
    let lastCtx, lastArgs
    let hooks = lib.createHookCollection(update)
    return render
    function update () {
      hooks.load(() => fn.call(lastCtx, ...lastArgs), lastArgs)
      Promise.resolve().then(() => hooks.updated())
    }
    function render (...args) {
      lastCtx = this
      lastArgs = args
      update()
    }
  }
}

module.exports = enhook
