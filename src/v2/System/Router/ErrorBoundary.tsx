import * as React from "react"
import { ErrorWithMetadata } from "v2/Utils/errors"
import createLogger from "v2/Utils/logger"
import { ErrorPage } from "v2/Components/ErrorPage"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { ArtsyLogoBlackIcon, Button, ThemeProviderV3 } from "@artsy/palette"
import { RouterLink } from "./RouterLink"

const logger = createLogger()

interface Props {
  children?: any
  onCatch?: () => void
}

interface State {
  asyncChunkLoadError: boolean
  detail: string
  genericError: boolean
  isError: boolean
  message: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    asyncChunkLoadError: false,
    detail: "",
    genericError: false,
    isError: false,
    message: "",
  }

  componentDidCatch(error: Error, errorInfo) {
    logger.error(new ErrorWithMetadata(error.message, errorInfo))

    if (this.props.onCatch) {
      this.props.onCatch()
    }
  }

  static getDerivedStateFromError(error: Error) {
    const message = error?.message || "Internal Server Error"
    const detail = error.stack

    /**
     * Check to see if there's been a network error while asynchronously loading
     * a dynamic webpack split chunk bundle. Can happen if a user is navigating
     * between routes and their network connection goes out.
     *
     * @see https://reactjs.org/docs/code-splitting.html
     */
    if (error.message.match(/Loading chunk .* failed/)) {
      return {
        isError: true,
        asyncChunkLoadError: true,
        detail,
        message,
      }
    }

    return {
      isError: true,
      genericError: true,
      detail,
      message,
    }
  }

  render() {
    const {
      asyncChunkLoadError,
      detail,
      genericError,
      isError,
      message,
    } = this.state

    if (isError) {
      return (
        <ThemeProviderV3>
          <AppContainer my={4}>
            <HorizontalPadding>
              <RouterLink to="/" display="block" mb={4}>
                <ArtsyLogoBlackIcon />
              </RouterLink>

              {(() => {
                switch (true) {
                  case asyncChunkLoadError: {
                    return (
                      <ErrorPage
                        code={500}
                        message="Please check your network connection and try again."
                      >
                        <Button
                          mt={2}
                          size="small"
                          variant="secondaryBlack"
                          onClick={() => window.location.reload()}
                        >
                          Reload
                        </Button>
                      </ErrorPage>
                    )
                  }

                  case genericError: {
                    return (
                      <ErrorPage code={500} message={message} detail={detail}>
                        <Button
                          mt={2}
                          size="small"
                          variant="secondaryBlack"
                          onClick={() => window.location.reload()}
                        >
                          Reload
                        </Button>
                      </ErrorPage>
                    )
                  }
                }
              })()}
            </HorizontalPadding>
          </AppContainer>
        </ThemeProviderV3>
      )
    }

    return this.props.children
  }
}
