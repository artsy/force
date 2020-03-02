import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { loadableReady } from "@loadable/component"

import { routes } from "reaction/Apps/IdentityVerification/routes"
import React from "react"
import ReactDOM from "react-dom"

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
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
