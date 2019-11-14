let enhook, lib

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  enhook = lib.augmentor
}

module.exports = { enhook }
