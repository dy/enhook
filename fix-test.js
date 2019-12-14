require('browser-env')({ pretendToBeVisual: true });

// polyfill MessageChannel for node (fuco requires it)
// FIXME: remove once https://github.com/wtnbass/fuco/issues/33
// global.MessageChannel = function () {
//   let port1 = {},
//     port2 = {
//       postMessage(...args) {
//         if (port1.onmessage) port1.onmessage(...args)
//       }
//     }
//   return {
//     port1,
//     port2
//   }
// }
