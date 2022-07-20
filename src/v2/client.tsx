import "lib/webpackPublicPath"

import ReactDOM from "react-dom"
import { getAppRoutes } from "v2/routes"
import { loadableReady } from "@loadable/component"
import { logoutEventHandler } from "lib/logoutHandler"
import { mediator } from "lib/mediator"
import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
import { getClientParam } from "./Utils/getClientParam"
import { buildClientApp } from "v2/System/Router/client"
import { loadSegment } from "lib/analytics/segmentOneTrustIntegration/segmentOneTrustIntegration"

async function setupClient() {
  Promise.all([
    import(
      /* webpackChunkName: "clientAppModals", webpackPrefetch: true */
      "./Utils/initAuthModalContainer"
    ),
  ]).then(clientImports => {
    const [{ initAuthModalContainer }] = clientImports

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
  })

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
