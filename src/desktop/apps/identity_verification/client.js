import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { loadableReady } from "@loadable/component"

import { routes } from "reaction/Apps/IdentityVerification/routes"
import mediator from "desktop/lib/mediator.coffee"
import React from "react"
import ReactDOM from "react-dom"

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
    isEigen: sd.EIGEN,
  },
})
  .then(({ ClientApp }) => {
    loadableReady(() => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
