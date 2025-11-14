import "Server/webpackPublicPath"
import { setupAnalytics } from "Server/analytics/helpers"
import { getOrInitUnleashClient } from "System/FeatureFlags/unleashClient"
import { setupClientRouter } from "System/Router/clientRouter"
import { setupSentryClient } from "System/Utils/setupSentryClient"
import { setupWebVitals } from "System/Utils/setupWebVitals"
import { loadableReady } from "@loadable/component"
import { hydrateRoot } from "react-dom/client"
import { getAppRoutes } from "routes"

setupAnalytics()
setupSentryClient()
setupWebVitals()

// Rehydrate app
;(async () => {
  const unleashClient = await getOrInitUnleashClient()

  const { ClientRouter } = await setupClientRouter({
    routes: getAppRoutes(),
    context: {
      featureFlags: {
        isEnabled: unleashClient.isEnabled.bind(unleashClient),
        getVariant: unleashClient.getVariant.bind(unleashClient),
        toggles: unleashClient.getAllToggles(),
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
