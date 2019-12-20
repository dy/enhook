import limit from '../limit.js'
let enhook, lib

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  const augment = lib.augmentor
  enhook = (fn, options = {}) => {
    fn = limit(fn)
    let ctx, passive = options.passive, blocked, end
    const augmented = augment(function () {
      if (passive && blocked) return
      if (passive) blocked = true
      return fn.apply(ctx, arguments)
    })

    function hookedFn(...args) {
      if (end) throw Error('Function is unhooked')
      fn.count = 0
      ctx = this
      blocked = false
      return augmented(...args)
    }

    hookedFn.unhook = () => {
      lib.dropEffect(augmented)
      end = true
      ctx = null
    }

    return hookedFn
  }

  enhook.useState = lib.useState
}

export default enhook
