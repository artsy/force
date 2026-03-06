import { Layout } from "Apps/Components/Layouts"
import { ContentErrorBoundary } from "System/Components/ContentErrorBoundary"
import { PageLoadingBar } from "System/Components/PageLoadingBar"
import { AnalyticsContextProvider } from "System/Contexts/AnalyticsContext"
import { NavigationHistoryProvider } from "System/Contexts/NavigationHistoryContext"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"
import { useDarkModeToggle } from "Utils/Hooks/useDarkModeToggle"
import { useNetworkOfflineMonitor } from "Utils/Hooks/useNetworkOfflineMonitor"
import { useOnboardingModal } from "Utils/Hooks/useOnboardingModal"
import { useProductionEnvironmentWarning } from "Utils/Hooks/useProductionEnvironmentWarning"
import { useSetupAuth } from "Utils/Hooks/useSetupAuth"
import createLogger from "Utils/logger"
import type { Match } from "found"
import { useEffect } from "react"
import type * as React from "react"

const logger = createLogger("Apps/Components/AppShell")
interface AppShellProps {
  children: React.ReactNode
  match?: Match
}

export const AppShell: React.FC<
  React.PropsWithChildren<AppShellProps>
> = props => {
  const { onboardingComponent } = useOnboardingModal()

  const { children, match } = props
  const routeConfig = match ? findCurrentRoute(match) : null

  const showLoader = !match?.elements

  // Check to see if a route has a onServerSideRender key; if so call it. Used
  // typically to preload bundle-split components (import()) while the route is
  // fetching data in the background.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    try {
      if (match) {
        routeConfig?.onClientSideRender?.({ match })
      }

      // Preload current route's JS bundle
      routeConfig?.onPreloadJS?.()
    } catch (error) {
      logger.error(error)
    }
  }, [routeConfig])

  // Let our end-to-end tests know that the app is hydrated and ready to go
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady")
  }, [])

  useDarkModeToggle()
  useNetworkOfflineMonitor()
  useProductionEnvironmentWarning()

  return (
    <>
      <PageLoadingBar loadingState={showLoader ? "loading" : "complete"} />

      <NavigationHistoryProvider>
        <AnalyticsContextProvider path={match?.location?.pathname}>
          <UseSetupAuth />

          <Layout variant={routeConfig?.layout}>
            {/* Inner error boundary: catches component crashes while preserving
                nav/footer. Re-throws chunk load errors to the outer boundary in
                Boot.tsx. See docs/error-handling.md for the two-tier system. */}
            <ContentErrorBoundary pathname={match?.location?.pathname}>
              {children}
            </ContentErrorBoundary>
          </Layout>

          {onboardingComponent}
        </AnalyticsContextProvider>
      </NavigationHistoryProvider>
    </>
  )
}

// Nest inside the AnalyticsContextProvider
const UseSetupAuth = () => {
  useSetupAuth()

  return null
}
