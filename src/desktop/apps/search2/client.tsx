import { buildClientApp } from "reaction/Artsy/Router/client"
import { routes } from "reaction/Apps/Search/routes"
import { data as sd } from "sharify"
import React from "react"
import ReactDOM from "react-dom"

const mediator = require("desktop/lib/mediator.coffee")
const splitTest = require("desktop/components/split_test/index.coffee")

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
  },
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    document.getElementById("loading-container").remove()
    splitTest("new_search_page").view()
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
