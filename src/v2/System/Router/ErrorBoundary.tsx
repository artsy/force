import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import React from "react"
import { ErrorWithMetadata } from "v2/Utils/errors"
import createLogger from "v2/Utils/logger"

const logger = createLogger()

interface Props {
  children?: any
  onCatch?: () => void
}

interface State {
  asyncChunkLoadError: boolean
  genericError: boolean
  errorStack: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = {
    asyncChunkLoadError: false,
    genericError: false,
    errorStack: "",
  }

  componentDidCatch(error, errorInfo) {
    logger.error(new ErrorWithMetadata(error.message, errorInfo))

    if (this.props.onCatch) {
      this.props.onCatch()
    }
  }

  static getDerivedStateFromError(error) {
    const errorStack = error.stack

    /**
     * Check to see if there's been a network error while asynchronously loading
     * a dynamic webpack split chunk bundle. Can happen if a user is navigating
     * between routes and their network connection goes out.
     *
     * @see https://reactjs.org/docs/code-splitting.html
     */
    if (error.message.match(/Loading chunk .* failed/)) {
      return {
        asyncChunkLoadError: true,
        errorStack,
      }
    }

    return {
      genericError: true,
      errorStack,
    }
  }

  render() {
    const { asyncChunkLoadError, genericError, errorStack } = this.state

    switch (true) {
      case asyncChunkLoadError: {
        return (
          <ErrorModalWithReload
            message="Please check your network connection and try again."
            show={asyncChunkLoadError}
          />
        )
      }
      case genericError: {
        return (
          <ErrorModalWithReload show={genericError} errorStack={errorStack} />
        )
      }
    }

    return this.props.children
  }
}

/**
 * An error popup with the option to reload the page
 */
const ErrorModalWithReload: React.FC<{
  message?: string
  show: boolean
  errorStack?: string
}> = ({ message, show, errorStack }) => {
  return (
    <>
      <ErrorModal
        show={show}
        detailText={message}
        errorStack={errorStack}
        closeText="Reload"
        ctaAction={() => {
          location.reload()
        }}
      />
    </>
  )
}
