import { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef, useLayoutEffect } from './src/provider/haunted.js'

if (!enhook) throw Error('`haunted` must be installed in deps.')

export default enhook
export { useState, useReducer, useEffect, useMemo, useCallback, useRef, useLayoutEffect }
