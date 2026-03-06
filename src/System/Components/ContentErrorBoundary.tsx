import { Button, Spacer } from "@artsy/palette"
import { ErrorPage } from "Components/ErrorPage"
import { ErrorWithMetadata } from "Utils/errors"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { captureException, withScope } from "@sentry/browser"
import { HttpError } from "found"
import * as React from "react"
import type { ErrorInfo } from "react"

const logger = createLogger()

interface ContentErrorBoundaryProps {
  children?: React.ReactNode
  pathname?: string
}

type Kind = "Pending" | "AsyncChunkLoadError" | "GenericError" | "RouterError"

interface ContentErrorBoundaryState {
  kind: Kind
  detail?: string
  message?: string
  code?: number
  originalError?: Error
}

/**
 * Inner error boundary that catches content-area errors (404s, data errors,
 * component crashes) while preserving the Layout nav and footer.
 *
 * AsyncChunkLoadError is NOT handled here — it bubbles up to the outer
 * ErrorBoundary in Boot.tsx since it's a network-level issue.
 */
export class ContentErrorBoundary extends React.Component<
  ContentErrorBoundaryProps,
  ContentErrorBoundaryState
> {
  state: ContentErrorBoundaryState = {
    detail: "",
    message: "",
    kind: "Pending",
  }

  componentDidCatch(error: Error | HttpError, errorInfo: ErrorInfo): void {
    // Skip reporting for AsyncChunkLoadError — it will be re-thrown in render()
    // and reported by the outer ErrorBoundary to avoid double Sentry reports.
    if (
      error instanceof Error &&
      error.message?.match(/Loading chunk .* failed/)
    ) {
      return
    }

    const message = error instanceof HttpError ? error.status : error.message
    logger.error(new ErrorWithMetadata(message, errorInfo))

    withScope(scope => {
      scope.setContext("errorInfo", {
        componentStack: errorInfo.componentStack,
      })
      scope.setTag("errorBoundary", "content")
      captureException(error)
    })
  }

  componentDidUpdate(prevProps: ContentErrorBoundaryProps): void {
    if (
      prevProps.pathname !== this.props.pathname &&
      this.state.kind !== "Pending"
    ) {
      this.setState({
        kind: "Pending",
        detail: "",
        message: "",
        code: undefined,
      })
    }
  }

  static getDerivedStateFromError(
    error: Error | HttpError,
  ): ContentErrorBoundaryState {
    if (error instanceof HttpError) {
      return {
        kind: "RouterError",
        code: error.status,
      }
    }

    // Capture AsyncChunkLoadError in state; re-throw in render() to bubble
    // up to the outer ErrorBoundary.
    if (error.message?.match(/Loading chunk .* failed/)) {
      return {
        kind: "AsyncChunkLoadError",
        originalError: error,
      }
    }

    const displayStackTrace = getENV("NODE_ENV") === "development"
    const currentURL =
      typeof window !== "undefined" ? window.location.href : "SSR"
    const message = `${error.message || "Internal Error"}
Current URL: ${currentURL}
Time: ${new Date().toUTCString()}`
    const detail = displayStackTrace ? error.stack : undefined

    return {
      kind: "GenericError",
      detail,
      message,
    }
  }

  render(): React.ReactNode {
    const { kind, detail, message, code } = this.state

    const handleClick = () => {
      window.location.reload()
    }

    switch (kind) {
      case "AsyncChunkLoadError": {
        // Re-throw to bubble up to the outer ErrorBoundary in Boot.tsx
        throw this.state.originalError
      }

      case "GenericError": {
        return (
          <>
            <Spacer y={4} />

            <ErrorPage
              code="Something Went Wrong"
              message={message}
              detail={detail}
            >
              <Spacer y={2} />

              <Button
                size="small"
                variant="secondaryBlack"
                onClick={handleClick}
              >
                Reload
              </Button>
            </ErrorPage>
          </>
        )
      }

      case "RouterError": {
        return (
          <>
            <Spacer y={4} />
            <ErrorPage code={code || 500} />
          </>
        )
      }

      case "Pending": {
        return this.props.children
      }
    }
  }
}
