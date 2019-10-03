import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "reaction/Artsy/Router/client"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { data as sd } from "sharify"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes: getAppRoutes(),
  context: {
    user: sd.CURRENT_USER,
    mediator,
  } as any,
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

// Artist page custom analytics
mediator.on("artist:tabclick", ({ to }) => {
  window.analytics.page(
    {
      path: to,
    },
    {
      integrations: {
        Marketo: false,
      },
    }
  )
})
