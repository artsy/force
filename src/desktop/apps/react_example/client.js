import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { rehydrateClient } from 'desktop/components/react/utils/renderReactLayout'

export default () => {
  const bootstrapData = rehydrateClient(window.__BOOTSTRAP__)

  ReactDOM.hydrate(
    <App {...bootstrapData} />,
    document.getElementById('react-root')
  )
}
