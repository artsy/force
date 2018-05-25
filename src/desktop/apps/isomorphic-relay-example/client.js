import React from 'react'
import ReactDOM from 'react-dom'
import { buildClientApp } from 'desktop/lib/psi/buildClientApp'
import { routes } from './routes'

buildClientApp(routes).then(({ App }) => {
  ReactDOM.hydrate(<App />, document.getElementById('react-root'))
})

if (module.hot) {
  module.hot.accept()
}
