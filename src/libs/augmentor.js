let enhook, lib

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  if (lib.contextual) {
    enhook = lib.contextual
  }
  // augmentor@1.1
  else {
    const augment = lib.augmentor
    enhook = (fn, options={}) => {
      if (options.passive) throw Error('Passive mode is not supported for augmentor')

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
