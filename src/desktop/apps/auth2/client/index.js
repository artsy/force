import React from 'react'
import ReactDOM from 'react-dom'
// import mediator from '../../../lib/mediator.coffee'

import { App } from 'desktop/apps/auth2/components/App.tsx'

// mediator.on('open:auth', (options) => {
//   const { mode } = options
//   if (mode) {
//     open(mode)
//   }
// })

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = window.__BOOTSTRAP__

  // Start app
  ReactDOM.hydrate(
    <App {...bootstrapData} />,
    document.getElementById('react-root')
  )
}
