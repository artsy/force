import * as React from "react";
import StaticContainer from "react-static-container"

import { Box } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { ErrorPage } from "v2/Components/ErrorPage"
import ElementsRenderer from "found/ElementsRenderer"
import { data as sd } from "sharify"
import createLogger from "v2/Utils/logger"
import { NetworkTimeout } from "./NetworkTimeout"
import { PageLoader } from "./PageLoader"

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
    setImmediate(() => setFetching?.(true))
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
    setImmediate(() => setFetching?.(false))
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

  const { isFetching, setFetching } = useSystemContext()

  if (isFetching) {
    setImmediate(() => setFetching?.(false))
  }

  const message =
    (process.env.NODE_ENV || sd.NODE_ENV) === "development"
      ? String(props.error.data)
      : "Internal error"

  // TODO: Make error code more granular. See:
  // https://artsyproduct.atlassian.net/browse/PLATFORM-1343
  // https://github.com/artsy/reaction/pull/1855
  return <ErrorPage code={props.error.status || 500} message={message} />
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
