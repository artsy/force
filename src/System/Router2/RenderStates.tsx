import StaticContainer from "found/StaticContainer"
import ElementsRenderer from "found/cjs/ElementsRenderer"
import { Box } from "@artsy/palette"
import { HttpError } from "found"
import { PageLoadingBar } from "System/Router/PageLoadingBar"
import { getENV } from "Utils/getENV"
import { AppShell } from "Apps/Components/AppShell"
import { ErrorPage } from "Components/ErrorPage"

let isInitialized = false

export const renderStates = {
  /**
   * This is the render state that is called when a route is matched and a
   * request is fired off to metaphysics.
   */
  renderPending: renderArgs => {
    return (
      <>
        <Renderer>{null}</Renderer>

        {/* Don't show loader on first SSR pass */}
        {isInitialized && (
          <PageLoadingBar loadingState="loading" key="loading" />
        )}
      </>
    )
  },

  /**
   * Once request is complete, render the page
   */
  renderReady: ({ elements, location }) => {
    return (
      <>
        <Renderer shouldUpdate>
          <RenderReady elements={elements} />
        </Renderer>

        {isInitialized && (
          <PageLoadingBar loadingState="complete" key="complete" />
        )}
      </>
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

const RenderReady = ({ elements }) => {
  if (!isInitialized) {
    setTimeout(() => {
      isInitialized = true
    }, 0)
  }

  return (
    <Box width="100%">
      <ElementsRenderer elements={elements} />
    </Box>
  )
}

const Renderer = ({ children, ...props }) => {
  return (
    <Box>
      <StaticContainer {...props}>{children}</StaticContainer>
    </Box>
  )
}
