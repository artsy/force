import "Server/webpackPublicPath"

import ReactDOM from "react-dom"
import { getAppRoutes } from "routes"
import { loadableReady } from "@loadable/component"
import {
  beforeAnalyticsReady,
  onAnalyticsReady,
} from "Server/analytics/helpers"
import { getClientParam } from "Utils/getClientParam"
import { buildClientApp } from "System/Router/buildClientApp"

async function setupClient() {
  // Attach analytics
  if (getClientParam("disableAnalytics") !== "true") {
    beforeAnalyticsReady()
    window.analytics?.ready(() => {
      onAnalyticsReady()
    })
  }

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
