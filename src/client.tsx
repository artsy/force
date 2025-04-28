import "Server/webpackPublicPath"
import { loadableReady } from "@loadable/component"
import { setupAnalytics } from "Server/analytics/helpers"
import { getOrInitUnleashClient } from "System/FeatureFlags/unleashClient"
import { setupClientRouter } from "System/Router/clientRouter"
import { setupSentryClient } from "System/Utils/setupSentryClient"
import { setupWebVitals } from "System/Utils/setupWebVitals"
import { hydrateRoot } from "react-dom/client"
import { getAppRoutes } from "routes"

setupAnalytics()
setupSentryClient()
setupWebVitals()

// Rehydrate app
;(async () => {
  const unleashClient = getOrInitUnleashClient()

  const { ClientRouter } = await setupClientRouter({
    routes: getAppRoutes(),
    context: {
      isEnabled: (flag: string) => unleashClient.isEnabled(flag),
      getVariant: (flag: string) => unleashClient.getVariant(flag),
    },
  })

  loadableReady().then(() => {
    hydrateRoot(
      document.getElementById("root") as HTMLElement,
      <ClientRouter />,
    )
  })
})()
