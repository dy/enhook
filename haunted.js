import { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef } from './src/provider/haunted.js'
import hooker from './src/enhook.js'

if (!enhook) throw Error('`haunted` must be installed in deps.')

export default enhook
export { useState, useReducer, useEffect, useMemo, useCallback, useRef }
