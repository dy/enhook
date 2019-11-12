import { enhook } from './src/provider/haunted.js'

if (!enhook) throw Error('`haunted` must be installed in deps.')

export default enhook
export * from 'any-hooks/haunted'
