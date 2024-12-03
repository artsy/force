import "Server/webpackPublicPath"
import { getAppRoutes } from "routes"
import { loadableReady } from "@loadable/component"
import { setupAnalytics } from "Server/analytics/helpers"
import { setupClientRouter } from "System/Router/clientRouter"
import { setupSentryClient } from "System/Utils/setupSentryClient"
import { setupWebVitals } from "System/Utils/setupWebVitals"
import { hydrateRoot } from "react-dom/client"

setupAnalytics()
setupSentryClient()
setupWebVitals()

// Rehydrate app
;(async () => {
  const { ClientRouter } = await setupClientRouter({
    routes: getAppRoutes(),
  })

  loadableReady().then(() => {
    hydrateRoot(
      document.getElementById("root") as HTMLElement,
      <ClientRouter />
    )
  })
})()

// Enable hot-reloading if available.
if (module.hot) {
  module.hot.accept()
}
