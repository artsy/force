import "Server/webpackPublicPath"
import { loadableReady } from "@loadable/component"
import { setupAnalytics } from "Server/analytics/helpers"
import { getOrInitUnleashClient } from "System/FeatureFlags/unleashClient"
import { setupClientRouter } from "System/Router/clientRouter"
import { setupSentryClient } from "System/Utils/setupSentryClient"
import { setupGlobalErrorHandlers } from "System/Utils/setupGlobalErrorHandlers"
import { setupWebVitals } from "System/Utils/setupWebVitals"
import { hydrateRoot } from "react-dom/client"
import { getAppRoutes } from "routes"

setupAnalytics()
setupSentryClient()
setupGlobalErrorHandlers()
setupWebVitals()

// Rehydrate app
;(async () => {
  const unleashClient = getOrInitUnleashClient()

  const { ClientRouter } = await setupClientRouter({
    routes: getAppRoutes(),
    context: {
      featureFlags: {
        isEnabled: unleashClient.isEnabled.bind(unleashClient),
        getVariant: unleashClient.getVariant.bind(unleashClient),
      },
    },
  })

  loadableReady().then(() => {
    hydrateRoot(
      document.getElementById("root") as HTMLElement,
      <ClientRouter />,
    )
  })
})()
