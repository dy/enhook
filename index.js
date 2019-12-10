import * as libs from './src/libs.js'
import hooker from './src/enhook.js'
import { current } from 'any-hooks'

let enhook
export { enhook as default, useFramework }

useFramework(null)

// replace exports to new config
function useFramework(lib) {
  // automatic detection based on any-hooks
  if (!lib || lib === 'auto') {
    let currentHooks, currentEnhook
    enhook = (fn) => {
      if (currentHooks !== current) {
        currentEnhook = libs[current]
        if (!currentEnhook) throw Error('Couldn\'t find enhook provider for selected hooks `' + current + '`')
        currentHooks = current
      }
      return currentEnhook(fn)
    }
  }

  // forced framework
  else if (typeof lib === 'string') {
    if (!libs[lib]) throw Error('Unknown provider: `' + lib + '`')
    enhook = libs[lib]
  }

  // direct enhook function
  else if (typeof lib === 'function') {
    enhook = lib
  }

  // lib/render fallback
  else if (lib && lib.render && lib.h) {
    enhook = () => hooker.apply(lib, arguments)
  }

  else throw Error('Unknown argument')

  return enhook
}
