import { render, h } from './src/provider/react.js'
import hooker from './src/enhook.js'

if (!h) throw Error('`react` must be installed in deps.')
if (!render) throw Error('`react-dom` must be installed in deps.')

export default hooker.bind({ render, h })
export * from 'any-hooks/react'
