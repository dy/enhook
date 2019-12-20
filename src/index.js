import libs from './libs.js'
import hooker from './enhook.js'
import { useState } from 'any-hooks'

let enhook

export { enhook as default }

// replace exports to new config
export function use (lib) {
  // automatic detection based on any-hooks
  if (!lib) {
    let currentUseState, currentEnhook
    enhook = (fn, options) => {
      if (currentUseState !== useState) {
        currentEnhook = libs.get(useState)
        if (!currentEnhook) throw Error('Can\'t find enhook provider for selected hooks.')
        currentUseState = useState
      }
      return currentEnhook(fn, options)
    }
  }

  // forced framework
  else if (typeof lib === 'string') {
    if (!libs.has(lib)) throw Error('Unknown provider: `' + lib + '`')
    enhook = libs.get(lib)
  }

  // direct enhook function
  else if (typeof lib === 'function') {
    enhook = libs.has(lib) ? libs.get(lib) : lib
  }

  // lib/render fallback
  else if (lib && lib.render && lib.h) {
    let { render, h } = lib
    enhook = hooker.bind({ render, h })
  }

  else throw Error('Unknown argument')

  enhook.use = use

  return enhook
}

use()

