import * as React from "react"
import StaticContainer from "react-static-container"
import { Box } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { ErrorPage } from "v2/Components/ErrorPage"
import ElementsRenderer from "found/ElementsRenderer"
import createLogger from "v2/Utils/logger"
import { NetworkTimeout } from "./NetworkTimeout"
import { PageLoader } from "./PageLoader"
import { AppShell } from "v2/Apps/Components/AppShell"
import { getENV } from "v2/Utils/getENV"
import { HttpError } from "found"

const logger = createLogger("Artsy/Router/Utils/RenderStatus")

export const RenderPending = () => {
  const { isFetching, setFetching } = useSystemContext()

  /**
   * First, set fetching to ensure that components that are listening for this
   * value have a chance to respond to the fetching state. This is necessary
   * because the `<Renderer>` component below will freeze all updates for the
   * duration of the fetch.
   */
  if (!isFetching) {
    setTimeout(() => setFetching?.(true), 0)
  }

  if (isFetching) {
    return (
      <>
        <Renderer>{null}</Renderer>

        <PageLoader
          className="reactionPageLoader" // positional styling comes from Force body.styl
          showBackground={false}
          step={10} // speed of progress bar, randomized between 1/x to simulate variable progress
          style={{
            borderTop: "1px solid white",
            position: "fixed",
            left: 0,
            top: -5,
            zIndex: 1000,
          }}
        />

        <NetworkTimeout />
      </>
    )
  }
}

export const RenderReady = (props: { elements: React.ReactNode }) => {
  const { isFetching, setFetching } = useSystemContext()

  if (isFetching) {
    setTimeout(() => setFetching?.(false), 0)
  }

  if (!isFetching) {
    return (
      <Renderer shouldUpdate>
        <ElementsRenderer elements={props.elements} />
      </Renderer>
    )
  }
}

export const RenderError: React.FC<{
  error: { status?: number; data?: any }
}> = props => {
  logger.error(props.error.data)

  const status = props.error.status || 500

  const { isFetching, setFetching } = useSystemContext()

  if (isFetching) {
    setTimeout(() => setFetching?.(false), 0)
  }

  const message =
    getENV("NODE_ENV") === "development"
      ? String(props.error.data)
      : "Internal Error"

  // Server-side 404s are handled by the error handler middleware
  if (typeof window === "undefined" && typeof jest === "undefined") {
    throw new HttpError(status, message)
  }

  return (
    <AppShell>
      <ErrorPage mt={4} code={status} message={message} />
    </AppShell>
  )
}

/**
 * Define a container component so that we don't run into reconciliation issues
 * due to an element existing in RenderPending that doesn't exist in RenderReady,
 * between the top most container and StaticContainer.
 *
 */
const Renderer = ({ children, ...props }) => {
  return (
    <Box>
      <StaticContainer {...props}>{children}</StaticContainer>
    </Box>
  )
}
