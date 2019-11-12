import { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef, useEvent, useProp, useHost, useRender } from './src/provider/atomico.js'

if (!enhook) throw Error('`atomico` must be installed in deps.')

export default enhook
export { useState, useReducer, useEffect, useMemo, useCallback, useRef, useEvent, useProp, useHost, useRender }
