// FIXME: must be assured that es modules version works synchronously
// FIXME: move to a separate package, like any-react

import * as preact from './preact'
import * as react from './react'
import * as rax from './rax'
import * as haunted from './haunted'
// import * as atomico from './atomico'
import * as tng from './tng'
import * as augmentor from './augmentor'

const winner = preact.render ? preact :
  react.render ? react :
  haunted.enhook ? haunted :
  // atomico.render ? atomico :
  rax.render ? rax :
  augmentor.enhook ? augmentor :
  tng.enhook ? tng : null

export const { render, h, enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef } = winner
