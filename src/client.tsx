import "Server/webpackPublicPath"
import { loadableReady } from "@loadable/component"
import { setupAnalytics } from "Server/analytics/helpers"
import { getOrInitUnleashClient } from "System/FeatureFlags/unleashClient"
import { setupClientRouter } from "System/Router/clientRouter"
import { setupSentryClient } from "System/Utils/setupSentryClient"
import { setupWebVitals } from "System/Utils/setupWebVitals"
import { hydrateRoot } from "react-dom/client"
import { getAppRoutes } from "routes"
import { getENV } from "Utils/getENV"

setupAnalytics()
setupSentryClient()
setupWebVitals()

// Rehydrate app
;(async () => {
  const unleashClient = getOrInitUnleashClient()

  // Get server-evaluated feature flags for initial render
  const serverFeatureFlags = getENV("FEATURE_FLAGS") || {}
  const serverFeatureVariants = getENV("FEATURE_VARIANTS") || {}

  const { ClientRouter } = await setupClientRouter({
    routes: getAppRoutes(),
    context: {
      featureFlags: {
        isEnabled: (flag: string) => {
          // Use server-evaluated flags initially to avoid hydration mismatch
          // After hydration, the client will fetch and use its own evaluations
          if (flag in serverFeatureFlags) {
            return serverFeatureFlags[flag]
          }
          return unleashClient.isEnabled(flag)
        },
        getVariant: (flag: string) => {
          // Use server-evaluated variants initially
          if (flag in serverFeatureVariants) {
            return serverFeatureVariants[flag]
          }
          return unleashClient.getVariant(flag)
        },
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
