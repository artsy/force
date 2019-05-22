import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { routes } from "reaction/Apps/Artist/routes"
import React from "react"
import ReactDOM from "react-dom"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
    showCollectionsRail: sd.ARTIST_COLLECTIONS_RAIL === "experiment", // TODO: update after Artist Collections Rail a/b test
  } as any,
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <ClientApp />,

      document.getElementById("react-root")
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}

mediator.on("artist:tabclick", ({ to }) => {
  window.analytics.page({ path: to }, { integrations: { Marketo: false } })
})
