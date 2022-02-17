import {
  Grid,
  Theme,
  injectGlobalStyles,
  themeProps,
  ToastsProvider,
} from "@artsy/palette"
import { SystemContextProvider, track } from "v2/System"
import { AppRouteConfig } from "v2/System/Router/Route"
import { useEffect } from "react"
import * as React from "react"
import { HeadProvider } from "react-head"
import { Environment } from "relay-runtime"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { Provider as StateProvider } from "unstated"
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
import { FlashMessage } from "v2/Components/Modal/FlashModal"
import { SiftContainer } from "v2/Utils/SiftContainer"
import { setupSentryClient } from "lib/setupSentryClient"

export interface BootProps {
  children: React.ReactNode
  context: ClientContext
  headTags?: JSX.Element[]
  onlyMatchMediaQueries?: MatchingMediaQueries
  relayEnvironment: Environment
  routes: AppRouteConfig[]
  user: User | null
}

const { GlobalStyles } = injectGlobalStyles()

export const Boot = track(undefined, {
  dispatch: Events.postEvent,
})((props: BootProps) => {
  /**
   * Let our end-to-end tests know that the app is hydrated and ready to go; and
   * if in prod, initialize Sentry.
   */
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady") //

    if (getENV("NODE_ENV") === "production") {
      setupSentryClient(sd)
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
      <GlobalStyles />

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
                    <ToastsProvider>
                      <Grid fluid maxWidth="100%">
                        <FlashMessage />
                        <FocusVisible />
                        <SiftContainer />
                        {children}
                      </Grid>
                    </ToastsProvider>
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
