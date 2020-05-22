import { buildClientApp } from "v2/Artsy/Router/buildClientApp"
import { data as sd } from "sharify"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import mediator from "desktop/lib/mediator.coffee"
import React from "react"
import ReactDOM from "react-dom"
import { loadableReady } from "@loadable/component"

buildClientApp({
  routes: collectRoutes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
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
