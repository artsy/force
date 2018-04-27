import { data as sd } from 'sharify'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { TestComponent } from 'reaction/Components/TestComponent'

export default () => {
  const bootstrapData = window.__BOOTSTRAP__

  // ReactDOM.hydrate(
  //   <TestComponent {...sd.relay} />,
  //   // <App {...bootstrapData} />,
  //   document.getElementById('react-root')
  // )
}
