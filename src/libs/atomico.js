// as per https://github.com/atomicojs/atomico/issues/15
let enhook, lib
try { lib = require('atomico') } catch (e) { }
if (lib) {
  enhook = (fn, options={}) => {
    let lastCtx, lastArgs, passive = options.passive, blocked
    let hooks = lib.createHookCollection(update)
    return render

    function update () {
      hooks.load(() => {
        if (passive && blocked) return
        if (passive) blocked = true
        return fn.call(lastCtx, ...lastArgs)
      }, lastArgs)
      Promise.resolve().then(() => hooks.updated())
    }
    function render (...args) {
      blocked = false
      lastCtx = this
      lastArgs = args
      update()
    }
  }
}

module.exports = enhook
