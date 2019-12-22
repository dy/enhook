import limit from './limit.js'

export default function enhookAugmentor (fn, options = {}) {
  let lib = this

  fn = limit(fn)
  let ctx, passive = options.passive, blocked, end
  const augmented = lib.augmentor(function () {
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

