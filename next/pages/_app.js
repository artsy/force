import { RelayEnvironmentProvider } from "relay-hooks"

import { createEnvironment } from "../lib/createEnvironment"

import { Theme, injectGlobalStyles } from "@artsy/palette"

const { GlobalStyles } = injectGlobalStyles()

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <RelayEnvironmentProvider
        environment={createEnvironment(pageProps.relayData)}
      >
        <GlobalStyles />
        <Theme />
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </Theme>
  )
}
