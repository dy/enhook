let enhook, lib

try { lib = require('haunted') } catch (e) { }
if (lib) {
  let State = lib.State

  enhook = (fn, options={}) => {
    let state = new State(() => update.call(null))
    let lastCtx, lastArgs, lastResult, blocked, passive = options.passive, end

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

    function hooked(...args) {
      if (end) throw Error('Function is unhooked')
      lastCtx = this
      lastArgs = args
      blocked = false
      update()
      return lastResult
    }

    hooked.unhook = () => {
      end = true
      state.teardown()
      state = lastCtx = lastArgs = lastResult = null
    }

    return hooked
  }
}

module.exports = enhook
