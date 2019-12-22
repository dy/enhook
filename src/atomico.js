// as per https://github.com/atomicojs/atomico/issues/15

export default function enhookAtomico (fn, options = {}) {
  let lib = this

  let lastCtx, lastArgs, passive = options.passive, blocked, end, result
  let hooks = lib.createHookCollection(update)

  function update() {
    hooks.load(() => {
      if (passive && blocked) return
      if (passive) blocked = true
      result = fn.call(lastCtx, ...lastArgs)
    }, lastArgs)
    Promise.resolve().then(() => hooks.updated())
  }
  function render(...args) {
    if (end) throw Error('Function is unhooked')
    blocked = false
    lastCtx = this
    lastArgs = args
    update()
    return result
  }
  render.unhook = () => {
    end = true
    hooks.unmount()
    lastCtx = lastArgs = null
  }

  return render
}
