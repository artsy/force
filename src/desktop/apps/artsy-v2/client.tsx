import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "v2/Artsy/Router/client"
import { getAppRoutes } from "v2/Apps/getAppRoutes"
import { artworkClient } from "./apps/artwork/artworkClient"
import { artistClient } from "./apps/artist/artistClient"
import { loadableReady } from "@loadable/component"
import { getContextPageFromClient } from "lib/getContextPage"
import { OwnerType } from "@artsy/cohesion"

buildClientApp({
  routes: getAppRoutes(),
})
  .then(({ ClientApp }) => {
    /**
     * Mount route-specific client code here
     */
    const mountClientAppSupport = () => {
      artistClient()
      artworkClient()
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
          const { pageType } = getContextPageFromClient()

          if (pageType === OwnerType.search) {
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
