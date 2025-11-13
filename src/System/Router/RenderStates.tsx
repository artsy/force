import { AppShell } from "Apps/Components/AppShell"
import { ErrorPage } from "Components/ErrorPage"
import { sentryRouterTracing } from "System/Utils/setupSentryClient"
import { getENV } from "Utils/getENV"
import { Box } from "@artsy/palette"
import { HttpError, type Match } from "found"
import ElementsRenderer from "found/cjs/ElementsRenderer"
import StaticContainer from "found/StaticContainer"

export const renderStates = {
  /**
   * This is the render state that is called when a route is matched and a
   * request is fired off to metaphysics.
   */
  renderPending: (_match: Match) => {
    return (
      <>
        <Renderer>{null}</Renderer>
      </>
    )
  },

  /**
   * Once request is complete, render the page
   */
  renderReady: (match: Match) => {
    sentryRouterTracing?.navigation(match)

    return (
      <Renderer shouldUpdate>
        <Box width="100%">
          <ElementsRenderer elements={match.elements} />
        </Box>
      </Renderer>
    )
  },

  /**
   * If there is an error, render the error page
   */
  renderError: ({ error }) => {
    const status = error.status || 500

    const message =
      getENV("NODE_ENV") === "development"
        ? String(error.data)
        : "Internal Error"

    // Server-side 404s are handled by the error handler middleware
    if (typeof window === "undefined" && typeof jest === "undefined") {
      throw new HttpError(status, message)
    }

    return (
      <AppShell>
        <ErrorPage code={status} message={message} />
      </AppShell>
    )
  },
}

const Renderer = ({ children, ...props }) => {
  return (
    <Box>
      <StaticContainer {...props}>{children}</StaticContainer>
    </Box>
  )
}
