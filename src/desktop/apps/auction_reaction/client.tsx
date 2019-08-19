import { buildClientApp } from "reaction/Artsy/Router/client"
import { routes } from "reaction/Apps/Auction/routes"
import { data as sd } from "sharify"
import React from "react"
import ReactDOM from "react-dom"

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
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
