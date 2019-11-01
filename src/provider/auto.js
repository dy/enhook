// FIXME: must be assured that es modules version works synchronously
// FIXME: move to a separate package, like any-react

import * as preact from './preact'
import * as react from './react'
import * as rax from './rax'
import * as augmentor from './augmentor'

const winner = preact.render ? preact :
  react.render ? react :
  rax.render ? rax :
  augmentor.render ? augmentor : null

const { render, h, useState, useEffect, useMemo } = winner

export { render, h, useState, useEffect, useMemo }
