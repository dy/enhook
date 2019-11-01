let h, render, lib, useState, useEffect, useMemo

try { lib = require('preact') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render

  let hooks = require('preact/hooks')
  useEffect = hooks.useEffect
  useState = hooks.useState
  useMemo = hooks.useMemo
}

export { h, render, useEffect, useMemo, useState }
