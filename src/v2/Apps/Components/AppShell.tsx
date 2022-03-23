import { Box, Flex, Theme } from "@artsy/palette"
import { useNetworkOfflineMonitor } from "v2/Utils/Hooks/useNetworkOfflineMonitor"
import { findCurrentRoute } from "v2/System/Router/Utils/findCurrentRoute"
import { useMaybeReloadAfterInquirySignIn } from "v2/System/Router/Utils/useMaybeReloadAfterInquirySignIn"
import { NavBar } from "v2/Components/NavBar"
import { Match } from "found"
import { isFunction } from "lodash"
import { Footer } from "v2/Components/Footer"
import { useEffect, useState } from "react"
import * as React from "react"
import createLogger from "v2/Utils/logger"
import { useSystemContext } from "v2/System"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { AppContainer } from "./AppContainer"
import { useRouteComplete } from "v2/Utils/Hooks/useRouteComplete"
import { useAuthIntent } from "v2/Utils/Hooks/useAuthIntent"
import { AppToasts } from "./AppToasts"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { useProductionEnvironmentWarning } from "v2/Utils/Hooks/useProductionEnvironmentWarning"
import { useAuthValidation } from "v2/Utils/Hooks/useAuthValidation"
import { Z } from "./constants"
import { appendMntnConversionPixel } from "v2/System/Analytics/MNTN/mntnConversionPixel"

const logger = createLogger("Apps/Components/AppShell")
interface AppShellProps {
  children: React.ReactNode
  match?: Match
}

export const AppShell: React.FC<AppShellProps> = props => {
  useAuthIntent()
  useAuthValidation()

  const { children, match } = props
  const routeConfig = match ? findCurrentRoute(match) : null
  const pathname = match?.location ? match.location.pathname : null
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

  useEffect(() => {
    const script = appendMntnConversionPixel(pathname)
    // does the removal of this element even matter if it is mounted in AppShell?
    return () => {
      if (script && document.getElementById("mntn_conversion")) {
        document.body.removeChild(script)
      }
    }
  }, [pathname])

  /**
   * Wait for route to finish rendering before (possibly) switching out the theme.
   *
   * When the route changes, the configured theme will change immediately; this
   * will cause the styles to update out of sync with the page change. Here we
   * wait for the route to finish rendering before setting the next theme.
   */
  const nextTheme = routeConfig?.theme ?? "v3"
  const [theme, setTheme] = useState<"v2" | "v3">(nextTheme)
  useRouteComplete({ onComplete: () => setTheme(nextTheme) })

  // TODO: When old backbone inquiry modal goes away, this can be removed
  useMaybeReloadAfterInquirySignIn()

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

      <Theme theme={theme}>
        <AppToasts accomodateNav={showNav} />

        <Flex
          as="main"
          id="main"
          // Occupies available vertical space
          flex={1}
        >
          <AppContainer maxWidth={appContainerMaxWidth}>
            <HorizontalPadding>{children}</HorizontalPadding>
          </AppContainer>
        </Flex>

        {showFooter && (
          <Flex bg="white100">
            <AppContainer>
              <HorizontalPadding>
                <Footer />
              </HorizontalPadding>
            </AppContainer>
          </Flex>
        )}
      </Theme>
    </Flex>
  )
}
