import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "reaction/Artsy/Router/client"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"

buildClientApp({
  routes: getAppRoutes(),
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
