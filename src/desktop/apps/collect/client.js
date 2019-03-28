import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { routes } from "reaction/Apps/Collect/routes"
import mediator from "desktop/lib/mediator.coffee"
import React from "react"
import ReactDOM from "react-dom"
import qs from "querystring"
import { clone, isArray } from "underscore"

mediator.on("collect:filter:changed", filters => {
  onFilterChange(filters)
})

buildClientApp({
  routes,
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

// Update URL with current filters and sort.
export const onFilterChange = filters => {
  const params = clone(filters)
  Object.keys(params).forEach(filter => {
    if (
      !params[filter] ||
      (isArray(params[filter]) && params[filter].length === 0)
    ) {
      delete params[filter]
    }
  })

  let fragment = ""

  if (location.pathname.indexOf("/collection/") === 0) {
    // for /collection/:id
    fragment = location.pathname + "?" + qs.stringify(params)
  } else {
    // for /collect
    let route = null
    if (params.medium) {
      route = "/collect" + (params.medium !== "*" ? "/" + params.medium : "")
      delete params.medium
    } else {
      route = "/collect"
    }
    fragment = route + "?" + qs.stringify(params)
  }

  window.history.pushState({}, null, fragment)
  return fragment
}
