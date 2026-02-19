import "Server/webpackPublicPath"
import { loadableReady } from "@loadable/component"
import { dispatchHydrationError } from "Components/HydrationErrorOverlay"
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
      {
        onRecoverableError:
          process.env.NODE_ENV === "development"
            ? (error, errorInfo) => {
                dispatchHydrationError(
                  error,
                  errorInfo.componentStack ?? undefined,
                )
              }
            : undefined,
      },
    )
  })
})()
