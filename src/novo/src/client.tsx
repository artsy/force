import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { loadableReady } from "@loadable/component"
import { logoutEventHandler } from "desktop/lib/logoutHandler"
import { mediator } from "lib/mediator"
import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"

;(async () => {
  try {
    // Generate client
    const { buildClientApp } = await import("v2/Artsy/Router/client")
    const { ClientApp } = await buildClientApp({
      routes: getAppNovoRoutes(),
    })

    // Rehydrate
    await loadableReady(() => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })

    // Attach analytics
    if (getParam("disableAnalytics") !== "true") {
      beforeAnalyticsReady()
      window.analytics.ready(() => {
        onAnalyticsReady()
      })
    }

    // Wire up auth modal
    const { initModalManager } = await import(
      "desktop/apps/authentication/client/initModalManager"
    )
    initModalManager()

    // Logout handler
    mediator.on("auth:logout", logoutEventHandler)

  } catch (error) {
    console.error(error)
  }
})()

function getParam(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has(name)) {
    return urlParams.get(name)
  }
  return null
}

// Enable hot-reloading if available.
if (module.hot) {
  module.hot.accept()
}
