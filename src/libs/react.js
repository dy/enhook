let hooker = require('../enhook')
let h, render, enhook
let lib
try { lib = require('react') } catch (e) { }
if (lib) {
  h = lib.createElement
}

try { render = require('react-dom').render } catch (e) { }

if (lib) enhook = (fn, options) => {
  if (options && options.passive) throw Error('Passive mode is not yet supported for `react`')
  return hooker.call({h, render}, fn, options)
}
// if (lib) enhook = hooker.bind({ h, render })

module.exports = enhook

