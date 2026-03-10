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
  const unleashClient = await getOrInitUnleashClient()

  const routerConfig = {
    routes: getAppRoutes(),
    context: {
      featureFlags: {
        isEnabled: unleashClient.isEnabled.bind(unleashClient),
        getVariant: unleashClient.getVariant.bind(unleashClient),
        toggles: unleashClient.getAllToggles(),
      },
    },
  }

  let clientRouterResult
  try {
    clientRouterResult = await setupClientRouter(routerConfig)
  } catch (e: any) {
    if (!e?.isFoundRedirectException) throw e

    // A route render function threw a RedirectException during initial route
    // resolution (getStoreRenderArgs). This happens when the client-side
    // Unleash state disagrees with the server's routing decision — either
    // because Unleash hasn't fetched yet (cold start, no localStorage) or
    // because localStorage has a stale value from before a flag change.
    //
    // Wait for the network fetch to provide the correct flag state, then
    // retry. Cold start: wait for "ready" (fires after first network fetch).
    // Stale cache: "ready" already fired from localStorage, so wait for
    // "update" (fires ~100–300ms later when the network response arrives).
    await new Promise<void>(resolve => {
      if (!unleashClient.isReady()) {
        unleashClient.once("ready", resolve)
      } else {
        unleashClient.once("update", resolve)
      }
      setTimeout(resolve, 3000)
    })

    clientRouterResult = await setupClientRouter(routerConfig)
  }

  const { ClientRouter } = clientRouterResult

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
