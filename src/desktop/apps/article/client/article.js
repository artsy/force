import React from 'react'
import ReactDOM from 'react-dom'
import App from 'desktop/apps/article/components/App'

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = window.__BOOTSTRAP__

  // Start app
  ReactDOM.hydrate(
    <App {...bootstrapData} />, document.getElementById('react-root')
  )
}
