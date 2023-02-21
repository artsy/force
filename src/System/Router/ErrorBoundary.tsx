import * as React from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"
import { ErrorPage } from "Components/ErrorPage"
import { Button, Spacer, ThemeProviderV3 } from "@artsy/palette"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { getENV } from "Utils/getENV"

const logger = createLogger()

interface Props {
  children?: any
  onCatch?: () => void
}

type Kind = "Pending" | "AsyncChunkLoadError" | "GenericError"

interface State {
  kind: Kind
  detail?: string
  message: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    detail: "",
    message: "",
    kind: "Pending",
  }

  componentDidCatch(error: Error, errorInfo) {
    logger.error(new ErrorWithMetadata(error.message, errorInfo))

    if (this.props.onCatch) {
      this.props.onCatch()
    }
  }

  static getDerivedStateFromError(error: Error) {
    const displayStackTrace = getENV("NODE_ENV") === "development"
    const message = `${error?.message || "Internal Server Error"}
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
    if (error.message.match(/Loading chunk .* failed/)) {
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
    const { kind, detail, message } = this.state

    const handleClick = () => {
      window.location.reload()
    }

    switch (kind) {
      case "AsyncChunkLoadError": {
        return (
          <ThemeProviderV3>
            <LayoutLogoOnly>
              <ErrorPage
                code={500}
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
          </ThemeProviderV3>
        )
      }

      case "GenericError": {
        return (
          <ThemeProviderV3>
            <LayoutLogoOnly>
              <ErrorPage code={500} message={message} detail={detail}>
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
          </ThemeProviderV3>
        )
      }

      case "Pending": {
        return this.props.children
      }
    }
  }
}
