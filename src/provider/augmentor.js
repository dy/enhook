let enhook, lib

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  const augment = lib.augmentor
  enhook = (fn) => {
    let ctx
    let augmentedFn = augment((...args) => fn.apply(ctx, args))
    return function (...args) {
      ctx = this
      return augmentedFn(...args)
    }
  }
}

module.exports = { enhook }
