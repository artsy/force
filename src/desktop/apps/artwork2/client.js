import { buildClientApp } from 'reaction/Artsy/Router'
import { routes } from 'reaction/Apps/Artwork/routes'
import React from 'react'
import ReactDOM from 'react-dom'

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
