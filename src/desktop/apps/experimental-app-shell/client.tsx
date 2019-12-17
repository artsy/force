import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "reaction/Artsy/Router/client"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { data as sd } from "sharify"
import { client as artworkClient } from "./artwork/client"
import { client as artistClient } from "./artist/client"
const mediator = require("desktop/lib/mediator.coffee")
const splitTest = require("desktop/components/split_test/index.coffee")

buildClientApp({
  routes: getAppRoutes(),
  context: {
    user: sd.CURRENT_USER,
    mediator,
  } as any,
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <ClientApp />,
      document.getElementById("react-root"),
      () => {
        const pageType = window.location.pathname.split("/")[1]
        splitTest("client_side_routing").view()

        if (pageType === "search") {
          document.getElementById("loading-container").remove()
          document.getElementById("search-page-header").remove()
        }
      }
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}

artworkClient()
artistClient()
