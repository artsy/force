import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { routes as viewingRoomRoutes } from "reaction/Apps/ViewingRoom/routes"
import React from "react"
import ReactDOM from "react-dom"
import { loadableReady } from "@loadable/component"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes: viewingRoomRoutes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
  } as any,
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
