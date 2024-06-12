import * as React from "react"
import StaticContainer from "found/StaticContainer"
import { Box } from "@artsy/palette"
import { useSystemContext } from "System/useSystemContext"
import { ErrorPage } from "Components/ErrorPage"
import createLogger from "Utils/logger"
import { NetworkTimeout } from "./NetworkTimeout"
import { AppShell } from "Apps/Components/AppShell"
import { getENV } from "Utils/getENV"
import { HttpError } from "found"

import ElementsRenderer from "found/cjs/ElementsRenderer"
import { PageLoadingBar } from "System/Router/PageLoadingBar"

const logger = createLogger("Artsy/Router/Utils/RenderStatus")

let isInitialized = false

export const RenderPending = () => {
  return (
    <>
      <Renderer>{null}</Renderer>

      {/* Don't show loader on first SSR pass */}
      {isInitialized && <PageLoadingBar loadingState="loading" key="loading" />}

      <NetworkTimeout />
    </>
  )
}

export const RenderReady = ({ elements }: { elements: React.ReactNode }) => {
  if (!isInitialized) {
    setTimeout(() => {
      isInitialized = true
    }, 0)
  }

  return (
    <>
      <Renderer shouldUpdate>
        <ElementsRenderer elements={elements} />
      </Renderer>

      {isInitialized && (
        <PageLoadingBar loadingState="complete" key="complete" />
      )}
    </>
  )
}

export const RenderError: React.FC<{
  error: { status?: number; data?: any }
}> = ({ error }) => {
  logger.error(error.data)

  const status = error.status || 500

  const { isFetching, setFetching } = useSystemContext()

  if (isFetching) {
    setTimeout(() => setFetching?.(false), 0)
  }

  const message =
    getENV("NODE_ENV") === "development" ? String(error.data) : "Internal Error"

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
export const Renderer = ({ children, ...props }) => {
  return (
    <Box>
      <StaticContainer {...props}>{children}</StaticContainer>
    </Box>
  )
}
