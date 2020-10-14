import { Grid, Theme, injectGlobalStyles, themeProps } from "@artsy/palette"
import * as Sentry from "@sentry/browser"
import { SystemContextProvider, track } from "v2/Artsy"
import { RouteConfig } from "found"
import React, { useEffect } from "react"
import { HeadProvider } from "react-head"
import { Environment } from "relay-runtime"
import { data as sd } from "sharify"
import { Provider as StateProvider } from "unstated"
import { BreakpointVisualizer } from "v2/Utils/BreakpointVisualizer"
import Events from "v2/Utils/Events"
import { getENV } from "v2/Utils/getENV"
import { ErrorBoundary } from "./ErrorBoundary"
import { FocusVisible } from "v2/Components/FocusVisible"

import {
  MatchingMediaQueries,
  MediaContextProvider,
  ResponsiveProvider,
} from "v2/Utils/Responsive"
import { AnalyticsContext } from "../Analytics/AnalyticsContext"
import { ClientContext } from "desktop/lib/buildClientAppContext"

export interface BootProps {
  children: React.ReactNode
  context: ClientContext
  headTags?: JSX.Element[]
  onlyMatchMediaQueries?: MatchingMediaQueries
  relayEnvironment: Environment
  routes: RouteConfig
  user: User
}

const { GlobalStyles } = injectGlobalStyles()

export const Boot = track(null, {
  dispatch: Events.postEvent,
})((props: BootProps) => {
  /**
   * Let our end-to-end tests know that the app is hydrated and ready to go; and
   * if in prod, initialize Sentry.
   */
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady") //

    if (getENV("NODE_ENV") === "production") {
      Sentry.init({ dsn: sd.SENTRY_PUBLIC_DSN })
    }
  }, [])

  const {
    children,
    context,
    headTags = [],
    onlyMatchMediaQueries,
    ...rest
  } = props

  const contextProps = {
    ...rest,
    ...context,
  }

  return (
    <Theme>
      <HeadProvider headTags={headTags}>
        <StateProvider>
          <SystemContextProvider {...contextProps}>
            <AnalyticsContext.Provider value={context?.analytics}>
              <ErrorBoundary>
                <MediaContextProvider onlyMatch={onlyMatchMediaQueries}>
                  <ResponsiveProvider
                    mediaQueries={themeProps.mediaQueries}
                    initialMatchingMediaQueries={onlyMatchMediaQueries as any}
                  >
                    <Grid fluid maxWidth="100%">
                      <GlobalStyles />
                      <FocusVisible />
                      {children}
                      {process.env.NODE_ENV === "development" && (
                        <BreakpointVisualizer />
                      )}
                    </Grid>
                  </ResponsiveProvider>
                </MediaContextProvider>
              </ErrorBoundary>
            </AnalyticsContext.Provider>
          </SystemContextProvider>
        </StateProvider>
      </HeadProvider>
    </Theme>
  )
})
