import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "reaction/Artsy/Router/client"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { data as sd } from "sharify"
import { artworkClient } from "./apps/artwork/artworkClient"
import { artistClient } from "./apps/artist/artistClient"
import { loadableReady } from "@loadable/component"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes: getAppRoutes(),
  context: {
    user: sd.CURRENT_USER,
    mediator,
  } as any,
})
  .then(({ ClientApp }) => {
    const pageType = window.location.pathname.split("/")[1] as
      | "artist"
      | "artwork"

    /**
     * Mount route-specific client code here
     */
    const mountClientAppSupport = () => {
      switch (pageType) {
        case "artist":
          return artistClient()
        case "artwork":
          return artworkClient()
      }
    }

    loadableReady(() => {
      mountClientAppSupport()

      /**
       * Render app
       */
      ReactDOM.hydrate(
        <ClientApp />,
        document.getElementById("react-root"),
        () => {
          const pageType = window.location.pathname.split("/")[1]

          if (pageType === "search") {
            document.getElementById("loading-container").remove()
            document.getElementById("search-page-header").remove()
          }
        }
      )
    })
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
