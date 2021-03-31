import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { getAppRoutes } from "v2/routes"
import { loadableReady } from "@loadable/component"
import { logoutEventHandler } from "desktop/lib/logoutHandler"
import { mediator } from "lib/mediator"
import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
;(async () => {
  try {
    // Generate client
    const { buildClientApp } = await import(
      /* webpackChunkName: "buildClientApp" */ "v2/Artsy/Router/client"
    )
    const { ClientApp } = await buildClientApp({
      routes: getAppRoutes(),
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
      /* webpackChunkName: "initModalManager" */
      "desktop/apps/authentication/client/initModalManager"
    )
    initModalManager()

    // Wire up artist modal
    const { setupArtistSignUpModal } = await import(
      /* webpackChunkName: "setupArtistSignUpModal" */
      "desktop/components/artistSignupModal/artistSignupModal"
    )
    setupArtistSignUpModal()

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
