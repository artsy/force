import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "v2/Artsy/Router/client"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { loadableReady } from "@loadable/component"
import { initModalManager } from "desktop/apps/authentication/client/initModalManager"
import { logoutEventHandler } from "desktop/lib/logoutHandler"
import { mediator } from "lib/mediator"

buildClientApp({
  routes: getAppNovoRoutes(),
})
  .then(({ ClientApp }) => {
    loadableReady(() => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
  })
  .then(() => {
    initModalManager()
  })
  .then(() => {
    mediator.on("auth:logout", logoutEventHandler)
  })
  .catch(error => {
    console.error(error)
  })
