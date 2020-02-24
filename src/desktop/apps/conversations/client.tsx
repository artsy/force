import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { conversationRoutes } from "reaction/Apps/Conversation/routes"
import React from "react"
import ReactDOM from "react-dom"
import { setupArtistSignUpModal } from "desktop/apps/artist/components/cta"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes: conversationRoutes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
  } as any,
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <ClientApp />,
      document.getElementById("react-root"),
      () => {
        setupArtistSignUpModal()
      }
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
