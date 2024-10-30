import "Server/webpackPublicPath"
import { getAppRoutes } from "routes"
import { loadableReady } from "@loadable/component"
import { setupAnalytics } from "Server/analytics/helpers"
import { setupClientRouter } from "System/Router/clientRouter"
import { setupSentryClient } from "System/Utils/setupSentryClient"
import { setupWebVitals } from "System/Utils/setupWebVitals"
// import { hydrateRoot } from "react-dom/client"
// import { createRoot } from "react-dom/client"
import { createRoot, hydrateRoot } from "react-dom/client"

setupAnalytics()
setupSentryClient()
setupWebVitals()

const { ClientRouter } = setupClientRouter({
  routes: getAppRoutes(),
})

// const root = createRoot(document.getElementById("react-root") as HTMLElement)
// const root = createRoot(document.getElementById("react-root") as HTMLElement)

loadableReady().then(() => {
  hydrateRoot(
    document.getElementById("react-root") as HTMLElement,
    <ClientRouter />
  )
})

// Enable hot-reloading if available.
if (module.hot) {
  module.hot.accept()
}
