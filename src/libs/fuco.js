let enhook, lib, render
let limit = require('../limit')


try { lib = require('fuco'); render = require('lit-html').render } catch (e) { }
if (lib) {
  const task = (fn) => {
    const ch = new MessageChannel();
    ch.port1.onmessage = fn;
    ch.port2.postMessage(null);
  }

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
  };

  customElements.define('enhook--fuco', lib.Component)

  enhook = (fn, options={}) => {
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
      console.log(1, 'in')
      el.performUpdate()
      task(() => {
        el._connected = false
      })
      return result
    }

    hooked.unhook = () => {
      end = true
      el.disconnectedCallback()
      state = ctx = args = result = null
    }

    return hooked
  }
}

module.exports = enhook
