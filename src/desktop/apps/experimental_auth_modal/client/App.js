import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__

  // <ContextProvider {...bootstrapData}>
  //   <Wizard redirectTo={redirectTo} />
  // </ContextProvider>

  // Start app
  ReactDOM.hydrate(<App />, document.getElementById('react-root'))
}
