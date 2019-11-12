import { customElement } from 'atomico'

let enhook, lib, useState, useReducer, useEffect, useMemo, useCallback, useRef

try { lib = require('atomico') } catch (e) { }
if (lib) {
  function Component() {
    console.log('called')
    return {nodeTyle: 'host'}
  }
  customElement('enhook-atomico', Component)

  enhook = (fn) => {
    let el = document.createElement('enhook-atomico')
    // customElements.upgrade(el)
    document.documentElement.appendChild(el)
    return fn
  }

  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
}

export { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef }
