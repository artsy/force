import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'desktop/apps/personalize/components/App'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__

  // Start app
  ReactDOM.hydrate(
    <App {...bootstrapData} />, document.getElementById('react-root')
  )
}
