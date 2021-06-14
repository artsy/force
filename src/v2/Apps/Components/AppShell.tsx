import { Flex, Theme } from "@artsy/palette"
import { NetworkOfflineMonitor } from "v2/System/Router/NetworkOfflineMonitor"
import { findCurrentRoute } from "v2/System/Router/Utils/findCurrentRoute"
import { useMaybeReloadAfterInquirySignIn } from "v2/System/Router/Utils/useMaybeReloadAfterInquirySignIn"
import { NavBar } from "v2/Components/NavBar"
import { Match } from "found"
import { isFunction } from "lodash"
import { Footer } from "v2/Components/Footer"
import React, { useEffect, useState } from "react"
import createLogger from "v2/Utils/logger"
import { useSystemContext } from "v2/System"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { AppContainer } from "./AppContainer"
import { useRouteComplete } from "v2/Utils/Hooks/useRouteComplete"
import { useAuthIntent } from "v2/Utils/Hooks/useAuthIntent"
import { AuthBanner } from "v2/Components/AuthBanner"
import { Media } from "v2/Utils/Responsive"
import { SkipLink } from "v2/Components/SkipLink"

const logger = createLogger("Apps/Components/AppShell")

interface AppShellProps {
  children: React.ReactNode
  match: Match
}

export const AppShell: React.FC<AppShellProps> = props => {
  useAuthIntent()

  const { children, match } = props
  const routeConfig = findCurrentRoute(match)
  const { user, isEigen } = useSystemContext()
  // @ts-expect-error STRICT_NULL_CHECK
  const showFooter = !isEigen && !routeConfig.hideFooter
  // @ts-expect-error STRICT_NULL_CHECK
  const appContainerMaxWidth = routeConfig.displayFullPage ? "100%" : null
  const isLoggedIn = Boolean(user)
  /**
   * Check to see if a route has a prepare key; if so call it. Used typically to
   * preload bundle-split components (import()) while the route is fetching data
   * in the background.
   */
  useEffect(() => {
    // @ts-expect-error STRICT_NULL_CHECK
    if (isFunction(routeConfig.prepare)) {
      try {
        // @ts-expect-error STRICT_NULL_CHECK
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

  /**
   * Wait for route to finish rendering before (possibly) switching out the theme.
   *
   * When the route changes, the configured theme will change immediately; this
   * will cause the styles to update out of sync with the page change. Here we
   * wait for the route to finish rendering before setting the next theme.
   */
  // @ts-expect-error STRICT_NULL_CHECK
  const nextTheme = routeConfig.theme ?? "v2"
  const [theme, setTheme] = useState<"v2" | "v3">(nextTheme)
  useRouteComplete({ onComplete: () => setTheme(nextTheme) })

  // TODO: When old backbone inquiry modal goes away, this can be removed
  useMaybeReloadAfterInquirySignIn()

  return (
    <>
      <Flex
        width="100%"
        // Prevents horizontal scrollbars from `FullBleed` + persistent vertical scrollbars
        overflowX="hidden"
        // Implements "Sticky footer" pattern
        // https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
        minHeight="100vh"
        flexDirection="column"
      >
        <SkipLink />

        <Media at="xs">{!isLoggedIn && <AuthBanner />}</Media>

        <NavBar />

        <Theme theme={theme}>
          <>
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

            <NetworkOfflineMonitor />

            {showFooter && (
              <Flex bg="white100">
                <AppContainer>
                  <HorizontalPadding>
                    <Footer />
                  </HorizontalPadding>
                </AppContainer>
              </Flex>
            )}
          </>
        </Theme>
      </Flex>
    </>
  )
}
