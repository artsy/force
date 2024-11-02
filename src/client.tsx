import "Server/webpackPublicPath"
import ReactDOM from "react-dom"
import { getAppRoutes } from "routes"
import { loadableReady } from "@loadable/component"
import { setupAnalytics } from "Server/analytics/helpers"
import { setupClientRouter } from "System/Router/clientRouter"
import { setupSentryClient } from "System/Utils/setupSentryClient"
import { setupWebVitals } from "System/Utils/setupWebVitals"
import { setupServiceWorkers } from "System/Utils/setupServiceWorkers"

setupAnalytics()
setupSentryClient()
setupServiceWorkers()
setupWebVitals()

const { ClientRouter } = setupClientRouter({
  routes: getAppRoutes(),
})

loadableReady().then(() => {
  ReactDOM.hydrate(<ClientRouter />, document.getElementById("react-root"))
})

// Enable hot-reloading if available.
if (module.hot) {
  module.hot.accept()
}
