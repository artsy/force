import { injectGlobalStyles, Theme } from "@artsy/palette"
import { MediaContextProvider } from "Utils/Responsive"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { track } from "react-tracking"
import { createBrowserRouter, makeRouteConfig, Route } from "found"

const { GlobalStyles } = injectGlobalStyles()

const relayEnvironment = createRelaySSREnvironment({
  metaphysicsEndpoint: "https://metaphysics-staging.artsy.net/v2",
  cache: JSON.parse(window.__RELAY_HYDRATION_DATA__ || "{}"),
})

export const decorators = [
  Story => {
    const Tracked = track()(Story)

    const BrowserRouter = createBrowserRouter({
      routeConfig: makeRouteConfig(
        <>
          <Route path="*" Component={Tracked} />
        </>
      ),
    })

    return (
      <SystemContextProvider relayEnvironment={relayEnvironment}>
        <Theme>
          <MediaContextProvider>
            <GlobalStyles />
            <BrowserRouter />
          </MediaContextProvider>
        </Theme>
      </SystemContextProvider>
    )
  },
]

// FIXME: Migrate this: https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spy-function
// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
// }
export const tags = ["autodocs"]
