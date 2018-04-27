import { data as sd } from 'sharify'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { getRelayEnvironment } from 'reaction/Relay/createEnvironment'
import { TestComponent } from 'reaction/Components/TestComponent'

export default () => {
  const bootstrapData = window.__BOOTSTRAP__
  const relayEnvironment = getRelayEnvironment(
    sd.relay.records,
    sd.CURRENT_USER
  )

  ReactDOM.hydrate(
    <TestComponent
      relayEnvironment={relayEnvironment}
      currentUser={sd.CURRENT_USER}
    />,
    // <App {...bootstrapData} />,
    document.getElementById('react-root')
  )
}
