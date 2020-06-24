import { buildClientApp } from "v2/Artsy/Router/client"
import { routes } from "v2/Apps/Auction/routes"
import { data as sd } from "sharify"
import React from "react"
import ReactDOM from "react-dom"
import { loadableReady } from "@loadable/component"

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
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
