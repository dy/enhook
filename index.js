import enhookAtomico from './src/atomico.js'
import enhookAugmentor from './src/augmentor.js'
import enhookFuco from './src/fuco.js'
import enhookHaunted from './src/haunted.js'
import enhookRax from './src/rax.js'
import enhookReact from './src/react.js'
import enhookStandard from './src/enhook.js'

let lib

// autodetect
if (!lib) try { lib = [require('react'), require('react-dom')] } catch (e) { }
if (!lib) try { lib = require('preact') } catch (e) { }
if (!lib) try { lib = [require('rax'), require('driver-dom')] } catch (e) { }
if (!lib) try { lib = require('augmentor') } catch (e) { }
if (!lib) try { lib = require('haunted') } catch (e) { }
if (!lib) try { lib = require('atomico') } catch (e) { }
if (!lib) try { lib = require('fuco') } catch (e) { }
if (!lib) try { lib = require('tng-hooks') } catch (e) { }

enhook.use = (a, b) => lib = b ? [a, b] : a

// FIXME: replace with import.meta.resolve(), await import() or other import-maps resolve
export default function enhook() {
  if (!lib) throw Error('Could not detect hooks library. Register it as `enhook.use(targetLib)` first.')
  if (lib.createHookCollection) {
    return enhookAtomico.apply(lib, arguments)
  }
  if (lib.h) {
    return enhookStandard.apply(lib, arguments)
  }
  if (Array.isArray(lib)) {
    // rax
    if (lib[0].shared) {
      return enhookRax.apply(lib, arguments)
    }
    return enhookReact.apply(lib, arguments)
  }
  if (lib.augmentor) {
    return enhookAugmentor.apply(lib, arguments)
  }
  if (lib.State) {
    return enhookHaunted.apply(lib, arguments)
  }
  if (lib.Component) {
    return enhookFuco.apply(lib, arguments)
  }
}
