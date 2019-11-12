import { customElement } from 'atomico'

try { lib = require('atomico') } catch (e) { }
if (lib) {
  function Component() {
    return {nodeTyle: 'host'}
  }
  customElement('enhook-atomico', Component)

  enhook = (fn) => {
    let el = document.createElement('enhook-atomico')
    // customElements.upgrade(el)
    document.documentElement.appendChild(el)
    return fn
  }
}

export { enhook }
