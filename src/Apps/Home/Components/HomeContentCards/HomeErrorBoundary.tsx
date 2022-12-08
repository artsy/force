import React from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"
import { FallbackCards } from "./FallbackCards"

const logger = createLogger()

interface Props {
  children?: any
}

interface State {
  isError: boolean
}

export class HomeErrorBoundary extends React.Component<Props, State> {
  state: State = { isError: false }

  componentDidCatch(error: Error, errorInfo) {
    logger.error(new ErrorWithMetadata(error.message, errorInfo))
  }

  static getDerivedStateFromError(error: Error) {
    return { isError: true }
  }

  render() {
    if (this.state.isError) return <FallbackCards />

    return this.props.children
  }
}
