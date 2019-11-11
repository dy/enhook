import { render, h, useState, useReducer, useEffect, useMemo, useCallback, useRef, useEvent, useProp, useHost, useRender } from './src/provider/atomico.js'
import hooker from './src/enhook.js'

if (!render || !h) throw Error('`atomico` must be installed in deps.')

export default hooker.bind({ render, h })
export { useState, useReducer, useEffect, useMemo, useCallback, useRef }
