import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { getAppRoutes } from "v2/routes"
import { loadableReady } from "@loadable/component"
import { logoutEventHandler } from "desktop/lib/logoutHandler"
import { mediator } from "lib/mediator"
import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
import { getClientParam } from "./Utils/getClientParam"

async function setupClient() {
  const clientImports = await Promise.all([
    import(
      /* webpackChunkName: "clientAppMain" */
      "v2/System/Router/client"
    ),
    import(
      /* webpackChunkName: "clientAppModals" */
      "desktop/apps/authentication/client/initModalManager"
    ),
    import(
      /* webpackChunkName: "clientAppModals" */
      "desktop/components/artistSignupModal/artistSignupModal"
    ),
  ])

  const [
    { buildClientApp },
    { initModalManager },
    { setupArtistSignUpModal },
  ] = clientImports

  const { ClientApp } = await buildClientApp({
    routes: getAppRoutes(),
  })

  // Rehydrate
  await loadableReady(() => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
  })

  // Attach analytics
  if (getClientParam("disableAnalytics") !== "true") {
    beforeAnalyticsReady()
    // @ts-expect-error STRICT_NULL_CHECK
    window.analytics.ready(() => {
      onAnalyticsReady()
    })
  }

  initModalManager()
  setupArtistSignUpModal()

  // Logout handler
  mediator.on("auth:logout", logoutEventHandler)
}

// Initialze clent
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
