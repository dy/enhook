import { enhook } from './src/provider/atomico.js'

if (!enhook) throw Error('`atomico` must be installed in deps.')

export default enhook
export * from 'any-hooks/atomico'
