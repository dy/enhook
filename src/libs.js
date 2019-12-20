import preact from './libs/preact.js'
import react from './libs/react.js'
import rax from './libs/rax.js'
import haunted from './libs/haunted.js'
import atomico from './libs/atomico.js'
import tngHooks from './libs/tng-hooks.js'
import augmentor from './libs/augmentor.js'
import fuco from './libs/fuco.js'

const dict = new Map()
if (preact) {
  dict.set('preact', preact)
  dict.set('preact/hooks', preact)
  dict.set('preact-compat', preact)
  dict.set('preact/compat', preact)
  dict.set(preact.useState, preact)
}
if (react) {
  dict.set('react', react)
  dict.set(react.useState, react)
}
if (rax) {
  dict.set('rax', rax)
  dict.set(rax.useState, rax)
}
if (haunted) {
  dict.set('haunted', haunted)
  dict.set(haunted.useState, haunted)
}
if (atomico) {
  dict.set('atomico', atomico)
  dict.set(atomico.useState, atomico)
}
if (augmentor) {
  dict.set('augmentor', augmentor)
  dict.set(augmentor.useState, augmentor)
}
if (fuco) {
  dict.set('fuco', fuco)
  dict.set(fuco.useState, fuco)
}
if (tngHooks) {
  dict.set('tng', tngHooks)
  dict.set('tngHooks', tngHooks)
  dict.set('tng-hooks', tngHooks)
  dict.set(tngHooks.useState, tngHooks)
}

// if (spect) {
//   dict.set('spect', spect)
//   dict.set(spect.useState, spect)
// }
// if (domAugmentor) {
//   dict.set('domAugmentor', domAugmentor)
//   dict.set('dom-augmentor', domAugmentor)
//   dict.set(domAugmentor.useState, domAugmentor)
// }
// if (neverland) {
//   dict.set('neverland', neverland)
//   dict.set(neverland.useState, neverland)
// }

export default dict
