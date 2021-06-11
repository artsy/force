import { buildClientApp } from "v2/System/Router/client"
import { auctionRoutes } from "v2/Apps/Auction/auctionRoutes"
import { data as sd } from "sharify"
import React from "react"
import ReactDOM from "react-dom"
import { loadableReady } from "@loadable/component"

buildClientApp({
  context: {
    user: sd.CURRENT_USER,
  },
  routes: auctionRoutes,
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
