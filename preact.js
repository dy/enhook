import { render, h, useState, useEffect, useMemo } from './src/provider/preact.js'
import hooker from './src/enhook.js'

if (!render || !h) throw Error('`preact` must be installed in deps.')

export default hooker.bind({ render, h })
export { useState, useEffect, useMemo }
