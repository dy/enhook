let preact =  require('./preact')
let react =  require('./react')
let rax =  require('./rax')
let haunted =  require('./haunted')
let atomico =  require('./atomico')
let tng =  require('./tng-hooks')
let augmentor =  require('./augmentor')

const winner =
  react.render ? react :
  preact.render ? preact :
  rax.render ? rax :
  haunted.enhook ? haunted :
  augmentor.enhook ? augmentor :
  atomico.render ? atomico :
  tng.enhook ? tng :
  {}

module.exports = winner
