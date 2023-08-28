import { useNetworkOfflineMonitor } from "Utils/Hooks/useNetworkOfflineMonitor"
import { findCurrentRoute } from "System/Router/Utils/findCurrentRoute"
import { Match } from "found"
import { isFunction } from "lodash"
import { useEffect } from "react"
import * as React from "react"
import createLogger from "Utils/logger"
import { useProductionEnvironmentWarning } from "Utils/Hooks/useProductionEnvironmentWarning"
import { useOnboardingModal } from "Utils/Hooks/useOnboardingModal"
import { Layout } from "Apps/Components/Layouts"
import { useSetupAuth } from "Utils/Hooks/useSetupAuth"
import { AnalyticsContextProvider } from "System/Analytics/AnalyticsContext"

const logger = createLogger("Apps/Components/AppShell")
interface AppShellProps {
  children: React.ReactNode
  match?: Match
}

export const AppShell: React.FC<AppShellProps> = props => {
  useSetupAuth()

  const { onboardingComponent } = useOnboardingModal()

  const { children, match } = props
  const routeConfig = match ? findCurrentRoute(match) : null

  // Check to see if a route has a onServerSideRender key; if so call it. Used
  // typically to preload bundle-split components (import()) while the route is
  // fetching data in the background.
  useEffect(() => {
    if (isFunction(routeConfig?.onClientSideRender) && match) {
      try {
        routeConfig?.onClientSideRender({ match })
      } catch (error) {
        logger.error(error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeConfig])

  // Let our end-to-end tests know that the app is hydrated and ready to go
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady")
  }, [])

  useNetworkOfflineMonitor()
  useProductionEnvironmentWarning()

  return (
    <AnalyticsContextProvider path={match?.location?.pathname}>
      <Layout variant={routeConfig?.layout}>{children}</Layout>

      {onboardingComponent}
    </AnalyticsContextProvider>
  )
}
