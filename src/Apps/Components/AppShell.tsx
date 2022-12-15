import { Box, Flex } from "@artsy/palette"
import { useNetworkOfflineMonitor } from "Utils/Hooks/useNetworkOfflineMonitor"
import { findCurrentRoute } from "System/Router/Utils/findCurrentRoute"
import { NavBar } from "Components/NavBar"
import { Match } from "found"
import { isFunction } from "lodash"
import { Footer } from "Components/Footer"
import { useEffect } from "react"
import * as React from "react"
import createLogger from "Utils/logger"
import { useSystemContext } from "System"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { AppContainer } from "./AppContainer"
import { useRunAuthIntent } from "Utils/Hooks/useAuthIntent"
import { AppToasts } from "./AppToasts"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useProductionEnvironmentWarning } from "Utils/Hooks/useProductionEnvironmentWarning"
import { useAuthValidation } from "Utils/Hooks/useAuthValidation"
import { Z } from "./constants"
import { useOnboardingModal } from "Utils/Hooks/useOnboardingModal"
import { useImagePerformanceObserver } from "Utils/Hooks/useImagePerformanceObserver"

const logger = createLogger("Apps/Components/AppShell")
interface AppShellProps {
  children: React.ReactNode
  match?: Match
}

export const AppShell: React.FC<AppShellProps> = props => {
  useImagePerformanceObserver()

  const { onboardingComponent } = useOnboardingModal()

  useRunAuthIntent()
  useAuthValidation()

  const { children, match } = props
  const routeConfig = match ? findCurrentRoute(match) : null
  const { isEigen } = useSystemContext()
  const showNav = !routeConfig?.hideNav
  const showFooter = !isEigen && !routeConfig?.hideFooter
  const appContainerMaxWidth = routeConfig?.displayFullPage ? "100%" : null

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

  const { height: navBarHeight } = useNavBarHeight()

  useNetworkOfflineMonitor()
  useProductionEnvironmentWarning()

  return (
    <Flex
      width="100%"
      // Prevents horizontal scrollbars from `FullBleed` + persistent vertical scrollbars
      overflowX="hidden"
      // Implements "Sticky footer" pattern
      // https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
      minHeight="100vh"
      flexDirection="column"
    >
      {showNav && (
        <Box height={navBarHeight}>
          <Box left={0} position="fixed" width="100%" zIndex={Z.globalNav}>
            <NavBar />
          </Box>
        </Box>
      )}

      <AppToasts accomodateNav={showNav} />

      <Flex
        as="main"
        id="main"
        // Occupies available vertical space
        flex={1}
      >
        <AppContainer maxWidth={appContainerMaxWidth}>
          <HorizontalPadding height="100%" overflow="hidden">
            {children}
          </HorizontalPadding>
        </AppContainer>
      </Flex>

      {showFooter && (
        <Flex bg="white100" zIndex={Z.footer}>
          <AppContainer>
            <HorizontalPadding>
              <Footer />
            </HorizontalPadding>
          </AppContainer>
        </Flex>
      )}

      {onboardingComponent}
    </Flex>
  )
}
