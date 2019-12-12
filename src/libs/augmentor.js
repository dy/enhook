let enhook, lib
let limit = require('../limit')

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  if (lib.contextual) {
    enhook = (fn, options={}) => {
      fn = limit(fn)

      let passive = options.passive, blocked
      let augmented = lib.contextual(function () {
        if (passive && blocked) return
        if (passive) blocked = true
        fn.apply(this, arguments)
      })

      return function () {
        fn.count = 0
        if (passive) blocked = false
        return augmented.apply(this, arguments)
      }
    }
  }
  // augmentor@1.1
  else {
    const augment = lib.augmentor
    enhook = (fn, options={}) => {
      if (options.passive) throw Error('Passive mode is not supported for augmentor')

      fn = limit(fn)
      let ctx
      const augmentedFn = augment((...args) => fn.apply(ctx, args))
      return function (...args) {
        ctx = this
        return augmentedFn(...args)
      }
    }
  }
}

module.exports = enhook
