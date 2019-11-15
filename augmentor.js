import { enhook } from './src/provider/augmentor'

if (!enhook) throw Error('`augmentor` must be installed in deps.')

export default enhook
export * from 'any-hooks/augmentor'
