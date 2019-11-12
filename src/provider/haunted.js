let enhook, lib

try { lib = require('haunted') } catch (e) { }
if (lib) {
  let State = lib.State

  enhook = (fn) => {
    let state = new State(() => update.call(null))
    let lastCtx, lastArgs, lastResult

    function update () {
      state.run(() => {
        lastResult = fn.call(lastCtx, ...lastArgs)
      })
      Promise.resolve().then(() => state.runEffects())
    }

    return function hooked (...args) {
      lastCtx = this
      lastArgs = args
      update()
      return lastResult
    }
  }
}

export { enhook }
