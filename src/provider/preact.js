let h, render, lib, hooks, useState, useReducer, useEffect, useMemo, useCallback, useRef

try { lib = require('preact') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
  hooks = require('preact/hooks')

  useState = hooks.useState
  useReducer = hooks.useReducer
  useEffect = hooks.useEffect
  useMemo = hooks.useMemo
  useCallback = hooks.useCallback
  useRef = hooks.useRef
}

export { h, render, useState, useReducer, useEffect, useMemo, useCallback, useRef }
