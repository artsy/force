import StaticContainer from "found/StaticContainer"
import ElementsRenderer from "found/cjs/ElementsRenderer"
import { Box } from "@artsy/palette"
import { HttpError } from "found"
import { getENV } from "Utils/getENV"
import { AppShell } from "Apps/Components/AppShell"
import { ErrorPage } from "Components/ErrorPage"

export const renderStates = {
  /**
   * This is the render state that is called when a route is matched and a
   * request is fired off to metaphysics.
   */
  renderPending: renderArgs => {
    return (
      <>
        <Renderer>{null}</Renderer>
      </>
    )
  },

  /**
   * Once request is complete, render the page
   */
  renderReady: ({ elements }) => {
    return (
      <Renderer shouldUpdate>
        <Box width="100%">
          <ElementsRenderer elements={elements} />
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
