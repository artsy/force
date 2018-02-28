import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

export default () => {
  const bootstrapData = window.__BOOTSTRAP__

  ReactDOM.hydrate(
    <App {...bootstrapData} />,
    document.getElementById('react-root')
  )
}
