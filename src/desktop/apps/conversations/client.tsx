import { buildClientApp } from "v2/Artsy/Router/client"
import { data as sd } from "sharify"
import { conversationRoutes } from "v2/Apps/Conversation/routes"
import React from "react"
import ReactDOM from "react-dom"
import { loadableReady } from "@loadable/component"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes: conversationRoutes,
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
