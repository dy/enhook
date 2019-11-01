import { render, h, useState, useReducer, useEffect, useMemo, useCallback, useRef } from './src/provider/auto.js'
import hooker from './src/enhook.js'

export default function enhook(...args) {
  if (!render || !h) {
    if (!this.render || !this.h) throw Error('Hooks provider is not found. `{ render, h }` must be provided as enhook.bind({ render, h }).')
    return hooker.call(this)
  }
  return hooker.call({ render, h }, ...args)
}

export { useState, useReducer, useEffect, useMemo, useCallback, useRef }
