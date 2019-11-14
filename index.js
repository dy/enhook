import { render, h, enhook } from './src/provider/auto.js'
import hooker from './src/enhook.js'

export default enhook || function enhook(...args) {
  if (!render || !h) {
    if (!this || !this.render || !this.h) throw Error('Hooks provider is not found. `{ render, h }` must be provided as enhook.bind({ render, h }).')
    return hooker.call(this)
  }
  return hooker.call({ render, h }, ...args)
}

export * from 'any-hooks'
