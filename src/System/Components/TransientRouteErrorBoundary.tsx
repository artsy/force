import { HttpError } from "found"
import * as React from "react"

interface TransientRouteErrorBoundaryProps {
  children?: React.ReactNode
  pathname?: string
}

interface TransientRouteErrorBoundaryState {
  caughtError: Error | HttpError | null
  rethrow: boolean
}

/**
 * Swallows transient null-data crashes that occur *while a route navigation is
 * in flight* and recovers automatically once the next route commits.
 *
 * Top-level route components read their principal entity from Relay and access
 * its fields directly (the generated types say it is non-null because
 * `@principalField` guarantees it at fetch time). During a navigation
 * transition that data can briefly resolve to `null`, and the component throws.
 * Those crashes are transient — the app recovers as soon as the next route
 * renders — so surfacing the error page + reporting to Sentry is just noise.
 *
 * This boundary owns *only* that concern:
 *
 * - A crash that coincides with an in-flight navigation: render nothing and
 *   recover when the next route commits (componentDidUpdate, on pathname
 *   change).
 * - Anything else (genuine errors on the current page, HttpErrors, chunk-load
 *   errors): re-thrown to the surrounding `ContentErrorBoundary`, which is
 *   unchanged and still owns all error UI and Sentry reporting.
 *
 * To remove this behavior entirely: delete this file and unwrap it in
 * `AppShell`. Nothing else depends on it.
 */
export class TransientRouteErrorBoundary extends React.Component<
  TransientRouteErrorBoundaryProps,
  TransientRouteErrorBoundaryState
> {
  state: TransientRouteErrorBoundaryState = {
    caughtError: null,
    rethrow: false,
  }

  static getDerivedStateFromError(
    error: Error | HttpError,
  ): Partial<TransientRouteErrorBoundaryState> {
    // Hold the error; the swallow-vs-rethrow decision is made in
    // componentDidCatch (which has access to props) and frozen into state so
    // render() never re-derives it.
    return { caughtError: error }
  }

  componentDidCatch(error: Error | HttpError): void {
    // Transient mid-navigation crash: do nothing — render nothing and let the
    // next route recover us. Anything else is handed off to
    // ContentErrorBoundary on the next render.
    if (!this.shouldSwallow(error)) {
      this.setState({ rethrow: true })
    }
  }

  componentDidUpdate(prevProps: TransientRouteErrorBoundaryProps): void {
    // The next route committed: recover and render it.
    if (prevProps.pathname !== this.props.pathname && this.state.caughtError) {
      this.setState({ caughtError: null, rethrow: false })
    }
  }

  /**
   * A navigation is in flight when the live URL has already advanced to the
   * destination but this boundary's committed `pathname` prop (frozen by the
   * router's StaticContainer during the pending transition) still reflects the
   * route we are leaving.
   */
  private isNavigating(): boolean {
    if (typeof window === "undefined") return false
    return window.location.pathname !== this.props.pathname
  }

  private shouldSwallow(error: Error | HttpError): boolean {
    // Deliberate router errors and chunk-load failures are not transient.
    if (error instanceof HttpError) return false
    if (error.message?.match(/Loading chunk .* failed/)) return false

    // Only a crash that coincides with an in-flight navigation is treated as a
    // transient teardown.
    return this.isNavigating()
  }

  render(): React.ReactNode {
    const { caughtError, rethrow } = this.state

    if (caughtError) {
      // Genuine errors bubble to ContentErrorBoundary.
      if (rethrow) {
        throw caughtError
      }

      // Transient: render nothing until the next route commits.
      return null
    }

    return this.props.children
  }
}
