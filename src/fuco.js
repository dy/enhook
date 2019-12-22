import limit from './limit.js'

// unfortunately we have to simulate that manually
const flushEffects = (hooks, key) => {
  const effects = hooks[key];
  const cleanups = hooks.cleanup;
  for (let i = 0, len = effects.length; i < len; i++) {
    if (effects[i]) {
      cleanups[i] && cleanups[i]();
      const cleanup = effects[i]();
      if (cleanup) {
        cleanups[i] = cleanup;
      }
      delete effects[i];
    }
  }
}

let init = false

export default function enhookFuco (fn, options={}) {
  if (!init) {
    init = true
    customElements.define('enhook--fuco', this.Component)
  }

  fn = limit(fn)

  let ctx, args, result, blocked, end, passive = options.passive

  let el = document.createElement('enhook--fuco')
  el.render = () => {
    if (passive && blocked) return
    if (passive) blocked = true
    result = fn.apply(ctx, args)
  }

  let hooked = function () {
    if (end) throw Error('Function is unhooked')
    args = arguments
    ctx = this
    // simulate connected state
    if (el._connected) {
      flushEffects(el.hooks, "layoutEffects")
      flushEffects(el.hooks, "effects")
    }
    el._connected = true
    blocked = false
    el.performUpdate()
    return result
  }

  hooked.unhook = () => {
    end = true
    el.disconnectedCallback()
    ctx = args = result = null
  }

  return hooked
}
