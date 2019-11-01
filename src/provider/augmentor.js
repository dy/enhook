let render, h, lib, useState, useEffect, useMemo

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  let augmentor = lib.default

  const cache = new WeakMap
  h = fn => {
    if (!cache.has(fn)) cache.set(fn, augmentor(fn))
    return cache.get(fn)
  }

  render = (what, where) => {
    return what()
  }

  useEffect = lib.useEffect
  useState = lib.useState
  useMemo = lib.useMemo
}

export { render, h, useState, useEffect, useMemo }
