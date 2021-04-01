import { Box } from "@artsy/palette"
import { NetworkOfflineMonitor } from "v2/Artsy/Router/NetworkOfflineMonitor"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { useMaybeReloadAfterInquirySignIn } from "v2/Artsy/Router/Utils/useMaybeReloadAfterInquirySignIn"
import { NAV_BAR_HEIGHT, NavBar, MOBILE_NAV_HEIGHT } from "v2/Components/NavBar"
import { Match } from "found"
import { isFunction } from "lodash"
import React, { useEffect } from "react"
import createLogger from "v2/Utils/logger"

const logger = createLogger("Apps/Components/AppShell")

interface AppShellProps {
  children: React.ReactNode
  match: Match
}

export const AppShell: React.FC<AppShellProps> = props => {
  const { children, match } = props
  const routeConfig = findCurrentRoute(match)

  /**
   * Check to see if a route has a prepare key; if so call it. Used typically to
   * preload bundle-split components (import()) while the route is fetching data
   * in the background.
   */
  useEffect(() => {
    if (isFunction(routeConfig.prepare)) {
      try {
        routeConfig.prepare()
      } catch (error) {
        logger.error(error)
      }
    }
  }, [routeConfig])

  /**
   * Let our end-to-end tests know that the app is hydrated and ready to go
   */
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady")
  }, [])

  // TODO: When old backbone inquiry modal goes away, this can be removed
  useMaybeReloadAfterInquirySignIn()

  return (
    <Box width="100%" overflowX="hidden">
      <Box pb={[MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT]}>
        <Box left={0} position="fixed" width="100%" zIndex={100}>
          <NavBar />
        </Box>
      </Box>

      <Box as="main" id="main">
        {children}
      </Box>

      <NetworkOfflineMonitor />
    </Box>
  )
}
