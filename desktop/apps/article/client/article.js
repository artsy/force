import React from 'react'
import ReactDOM from 'react-dom'
import App from 'desktop/apps/article/components/App'
import { rehydrateClient } from 'desktop/components/react/utils/renderReactLayout'

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = rehydrateClient(window.__BOOTSTRAP__)

  // Start app
  ReactDOM.hydrate(
    <App {...bootstrapData} />, document.getElementById('react-root')
  )
}
