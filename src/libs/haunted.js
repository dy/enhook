let enhook, lib

try { lib = require('haunted') } catch (e) { }
if (lib) {
  let State = lib.State

  enhook = (fn, options={}) => {
    let state = new State(() => update.call(null))
    let lastCtx, lastArgs, lastResult, blocked, passive = options.passive

    function update () {
      state.run(() => {
        if (passive && blocked) return
        if (passive) blocked = true
        lastResult = fn.call(lastCtx, ...lastArgs)
      })
      Promise.resolve().then(() => {
        state.runEffects()
      })
    }

    return function hooked (...args) {
      lastCtx = this
      lastArgs = args
      blocked = false
      update()
      return lastResult
    }
  }
}

module.exports = enhook
