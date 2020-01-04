export default function enhookHaunted (fn, options={}) {
  let State = this.State
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

  hooked.unhook = () => Promise.resolve().then(() => {
    end = true
    state.teardown()
    state = lastCtx = lastArgs = lastResult = null
  })

  return hooked
}
