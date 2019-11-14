import * as lib from './src/provider/auto.js'
import hooker from './src/enhook.js'

export default lib.enhook || function enhook(...args) {
  let render = this && this.render || lib.render
  let h = this && this.h || lib.h

  if (!render || !h) throw Error('Hooks provider is not found. `{ render, h }` must be provided as `enhook.bind({ render, h })`')

  return hooker.call({ render, h }, ...args)
}

export * from 'any-hooks'
