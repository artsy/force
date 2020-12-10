import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { loadableReady } from "@loadable/component"
import { logoutEventHandler } from "desktop/lib/logoutHandler"
import { mediator } from "lib/mediator"
import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"

import("v2/Artsy/Router/client")
  .then(({ buildClientApp }) => {
    return buildClientApp({
      routes: getAppNovoRoutes(),
    })
  })
  .then(({ ClientApp }) => {
    loadableReady(() => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
  })
  .then(() => {
    beforeAnalyticsReady()
    window.analytics.ready(() => {
      onAnalyticsReady()
    })
  })
  .then(() => {
    return import("desktop/apps/authentication/client/initModalManager")
  })
  .then(({ initModalManager }) => {
    initModalManager()
  })
  .then(() => {
    mediator.on("auth:logout", logoutEventHandler)
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
