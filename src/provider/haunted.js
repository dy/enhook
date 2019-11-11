let enhook, lib, hooks, useState, useReducer, useEffect, useMemo, useCallback, useRef

try { lib = require('haunted') } catch (e) { }
if (lib) {
  let State = lib.State

  enhook = (fn) => {
    let state = new State(() => update.call(null))
    let lastCtx, lastArgs, lastResult

    function update () {
      state.run(() => {
        lastResult = fn.call(lastCtx, ...lastArgs)
      })
      queueMicrotask(() => {
        state.runEffects()
      })
    }

    return function hooked (...args) {
      lastCtx = this
      lastArgs = args
      update()
      return lastResult
    }
  }

  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
}

export { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef }
