import * as React from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"
import { ErrorPage } from "Components/ErrorPage"
import { Button, Spacer } from "@artsy/palette"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { getENV } from "Utils/getENV"
import { ErrorInfo } from "react"
import { HttpError } from "found"

const logger = createLogger()

interface Props {
  children?: any
  onCatch?: () => void
}

type Kind = "Pending" | "AsyncChunkLoadError" | "GenericError" | "RouterError"

interface State {
  kind: Kind
  detail?: string
  message?: string
  code?: number
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    detail: "",
    message: "",
    kind: "Pending",
  }

  componentDidCatch(error: Error | HttpError, errorInfo: ErrorInfo) {
    const message = error instanceof HttpError ? error.status : error.message
    logger.error(new ErrorWithMetadata(message, errorInfo))

    if (this.props.onCatch) {
      this.props.onCatch()
    }
  }

  static getDerivedStateFromError(error: Error | HttpError) {
    if (error instanceof HttpError) {
      return {
        kind: "RouterError",
        code: error.status,
      }
    }

    const displayStackTrace = getENV("NODE_ENV") === "development"
    const message = `${error.message || "Internal Error"}
Current URL: ${window.location.href}
Time: ${new Date().toUTCString()}`
    const detail = displayStackTrace ? error.stack : undefined

    /**
     * Check to see if there's been a network error while asynchronously loading
     * a dynamic webpack split chunk bundle. Can happen if a user is navigating
     * between routes and their network connection goes out.
     *
     * @see https://reactjs.org/docs/code-splitting.html
     */
    if (message.match(/Loading chunk .* failed/)) {
      return {
        kind: "AsyncChunkLoadError",
        detail,
        message,
      }
    }

    return {
      kind: "GenericError",
      detail,
      message,
    }
  }

  render() {
    const { kind, detail, message, code } = this.state

    const handleClick = () => {
      window.location.reload()
    }

    switch (kind) {
      case "AsyncChunkLoadError": {
        return (
          <LayoutLogoOnly>
            <ErrorPage
              code="Error Loading Script"
              message="Please check your network connection and try again."
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
          </LayoutLogoOnly>
        )
      }

      case "GenericError": {
        return (
          <LayoutLogoOnly>
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
          </LayoutLogoOnly>
        )
      }

      case "RouterError": {
        return (
          <LayoutLogoOnly>
            <ErrorPage code={code || 500} />
          </LayoutLogoOnly>
        )
      }

      case "Pending": {
        return this.props.children
      }
    }
  }
}
