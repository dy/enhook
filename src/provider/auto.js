// FIXME: must be assured that es modules version works synchronously
// FIXME: move to a separate package, like any-react

import * as preact from './preact'
import * as react from './react'
import * as rax from './rax'
import * as tng from './tng'
import * as augmentor from './augmentor'

const winner = preact.render ? preact :
  react.render ? react :
  rax.render ? rax :
  augmentor.enhook ? augmentor :
  tng.enhook ? tng : null

const { render, h, enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef } = winner
export { render, h, enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef }
