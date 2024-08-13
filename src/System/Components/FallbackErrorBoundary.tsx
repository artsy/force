import React, { Component, ErrorInfo, ReactNode } from "react"

export interface ErrorFallbackProps {
  error?: Error
  errorInfo?: ErrorInfo
  onReset: () => void
}

interface FallbackErrorBoundaryProps {
  children?: ReactNode
  FallbackComponent: React.ComponentType<ErrorFallbackProps>
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

const DEFAULT_STATE: State = {
  hasError: false,
}

export class FallbackErrorBoundary extends Component<
  FallbackErrorBoundaryProps,
  State
> {
  public state: State = DEFAULT_STATE

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ error, errorInfo })
  }

  public handleReset() {
    this.setState(DEFAULT_STATE)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <this.props.FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset.bind(this)}
        />
      )
    }

    return this.props.children
  }
}
