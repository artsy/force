import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { collectRoutes } from "reaction/Apps/Collect2/collectRoutes"
import mediator from "desktop/lib/mediator.coffee"
import React from "react"
import ReactDOM from "react-dom"

buildClientApp({
  routes: collectRoutes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
  },
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
