import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { routes } from "reaction/Apps/Artist/routes"
import React from "react"
import ReactDOM from "react-dom"
import qs from "querystring"
import { clone, isArray } from "underscore"

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

mediator.on("artist:filter:changed", filters => {
  onFilterChange(filters)
})

mediator.on("artist:tabclick", ({ to }) => {
  window.analytics.page({ path: to }, { integrations: { Marketo: false } })
})

// Update URL with current filters and sort.
const onFilterChange = filters => {
  const params = clone(filters)
  Object.keys(params).forEach(filter => {
    if (
      !params[filter] ||
      (isArray(params[filter]) && params[filter].length === 0)
    ) {
      delete params[filter]
    }
  })

  const fragment = "?" + qs.stringify(params)
  window.history.pushState({}, null, fragment)
}
