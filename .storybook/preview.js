import { injectGlobalStyles, Theme } from "@artsy/palette"
import { MediaContextProvider } from "Utils/Responsive"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { track } from "react-tracking"

const { GlobalStyles } = injectGlobalStyles()

const relayEnvironment = createRelaySSREnvironment({
  metaphysicsEndpoint: "https://metaphysics-staging.artsy.net/v2",
  cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
})

export const decorators = [
  Story => {
    const Tracked = track()(Story)

    return (
      <SystemContextProvider relayEnvironment={relayEnvironment}>
        <Theme>
          <MediaContextProvider>
            <GlobalStyles />
            <Tracked />
          </MediaContextProvider>
        </Theme>
      </SystemContextProvider>
    )
  },
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
