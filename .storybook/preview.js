import { injectGlobalStyles, ThemeProviderV3 } from "@artsy/palette"
import { MediaContextProvider } from "Utils/Responsive"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { SystemContextProvider } from "System"

const { GlobalStyles } = injectGlobalStyles()

const relayEnvironment = createRelaySSREnvironment({
  metaphysicsEndpoint: "https://metaphysics-staging.artsy.net/v2",
  cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
})

export const decorators = [
  Story => {
    return (
      <SystemContextProvider relayEnvironment={relayEnvironment}>
        <MediaContextProvider>
          <ThemeProviderV3>
            <GlobalStyles />
            <Story />
          </ThemeProviderV3>
        </MediaContextProvider>
      </SystemContextProvider>
    )
  },
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
