import { Box, Flex, Theme } from "@artsy/palette"
import { NetworkOfflineMonitor } from "v2/Artsy/Router/NetworkOfflineMonitor"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { useMaybeReloadAfterInquirySignIn } from "v2/Artsy/Router/Utils/useMaybeReloadAfterInquirySignIn"
import { NAV_BAR_HEIGHT, NavBar, MOBILE_NAV_HEIGHT } from "v2/Components/NavBar"
import { Match } from "found"
import { isFunction } from "lodash"
import { Footer } from "v2/Components/Footer"
import React, { useEffect } from "react"
import createLogger from "v2/Utils/logger"
import { useSystemContext } from "v2/Artsy"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { AppContainer } from "./AppContainer"

const logger = createLogger("Apps/Components/AppShell")

interface AppShellProps {
  children: React.ReactNode
  match: Match
}

export const AppShell: React.FC<AppShellProps> = props => {
  const { children, match } = props
  const routeConfig = findCurrentRoute(match)

  const { isEigen } = useSystemContext()
  const showFooter = !isEigen

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
    <Box
      width="100%"
      // Prevents horizontal scrollbars from `FullBleed` + persistent vertical scrollbars
      overflowX="hidden"
    >
      <Box pb={[MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT]}>
        <Box left={0} position="fixed" width="100%" zIndex={100}>
          <NavBar />
        </Box>
      </Box>

      <Theme theme={routeConfig.theme ?? "v2"}>
        <>
          <Box as="main" id="main">
            {children}
          </Box>

          <NetworkOfflineMonitor />

          <Flex backgroundColor="white100">
            <AppContainer>
              <HorizontalPadding>{showFooter && <Footer />}</HorizontalPadding>
            </AppContainer>
          </Flex>
        </>
      </Theme>
    </Box>
  )
}
