// limit function call by max number of times per tick
let MAX = 50

export default function limit (fn) {
  let dirty
  let wrapped = function () {
    if (++wrapped.count >= MAX) throw Error('More than ' + MAX + ' calls, likely there\'s infinite recursion')

    if (!dirty) {
      dirty = true
      Promise.resolve().then(() => {
        dirty = false
        wrapped.count = 0
      })
    }

    return fn.apply(this, arguments)
  }
  wrapped.count = 0

  return wrapped
}
