import "Server/webpackPublicPath"

import ReactDOM from "react-dom"
import { getAppRoutes } from "routes"
import { loadableReady } from "@loadable/component"
import { logoutEventHandler } from "Server/logoutHandler"
import { mediator } from "Server/mediator"
import {
  beforeAnalyticsReady,
  onAnalyticsReady,
} from "Server/analytics/helpers"
import { getClientParam } from "Utils/getClientParam"
import { buildClientApp } from "System/Router/buildClientApp"
import { loadSegment } from "Server/analytics/segmentOneTrustIntegration/segmentOneTrustIntegration"
import { initAuthModalContainer } from "Utils/initAuthModalContainer"

async function setupClient() {
  // Attach analytics
  if (getClientParam("disableAnalytics") !== "true") {
    beforeAnalyticsReady()
    window.analytics?.ready(() => {
      onAnalyticsReady()
    })
  }

  loadSegment()
  initAuthModalContainer()

  // Logout handler
  mediator.on("auth:logout", logoutEventHandler)

  const { ClientApp } = await buildClientApp({
    routes: getAppRoutes(),
  })

  // Rehydrate
  await loadableReady(() => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
  })
}

// Initialze client
;(async () => {
  try {
    await setupClient()
  } catch (error) {
    console.error("[v2/client.tsx] Error loading client:", error)
  }
})()

// Enable hot-reloading if available.
if (module.hot) {
  module.hot.accept()
}
