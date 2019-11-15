let enhook, lib

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  if (lib.contextual) {
    enhook = lib.contextual
  }
  // previous augmentor versions
  else {
    const augment = lib.augmentor
    enhook = (fn) => {
      let ctx
      const augmentedFn = augment((...args) => fn.apply(ctx, args))
      return function (...args) {
        ctx = this
        return augmentedFn(...args)
      }
    }
  }
}

module.exports = { enhook }
