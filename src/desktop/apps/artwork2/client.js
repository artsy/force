import React from 'react'
import ReactDOM from 'react-dom'
import { buildClientApp } from 'reaction/Router'
import { routes } from './routes'

buildClientApp({ routes })
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById('react-root'))
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
