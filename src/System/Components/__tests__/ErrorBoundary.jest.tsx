import { ErrorBoundary } from "System/Components/ErrorBoundary"
import { render } from "@testing-library/react"
import { act } from "react"

jest.mock("Utils/getENV", () => ({
  getENV: () => "development",
}))

describe("ErrorBoundary", () => {
  const errorLog = console.error

  beforeAll(() => {
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = errorLog
  })

  it("renders children if no error", () => {
    const { container } = render(
      <ErrorBoundary>
        <div>found child</div>
      </ErrorBoundary>,
    )

    expect(container.textContent).toContain("found child")
  })

  it("calls componentDidCatch if error", () => {
    jest.spyOn(ErrorBoundary.prototype, "componentDidCatch")

    const ErrorComponent = () => {
      throw new Error("throw error")
    }

    try {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>,
      )
    } catch {
      // Ignore the error for testing purposes
    }

    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled()
  })

  it("updates `detail` state with stack trace", () => {
    const ErrorComponent = () => {
      throw new Error("throw error")
    }

    let errorBoundaryInstance: any = null
    const TestWrapper = () => {
      return (
        <ErrorBoundary
          ref={ref => {
            errorBoundaryInstance = ref
          }}
        >
          <ErrorComponent />
        </ErrorBoundary>
      )
    }

    try {
      render(<TestWrapper />)
    } catch {
      // Ignore the error for testing purposes
    }

    if (errorBoundaryInstance) {
      const state = errorBoundaryInstance.state
      expect(state.detail).toContain("Error: throw error")
    }
  })

  it("shows error page when the error kind is GenericError", () => {
    let errorBoundaryInstance: any = null
    const TestWrapper = () => {
      return (
        <ErrorBoundary
          ref={ref => {
            errorBoundaryInstance = ref
          }}
        >
          <div>erroneous render</div>
        </ErrorBoundary>
      )
    }

    const { container, rerender } = render(<TestWrapper />)

    act(() => {
      if (errorBoundaryInstance) {
        errorBoundaryInstance.setState({
          kind: "GenericError",
          message: "Test error message",
        })
      }
    })

    rerender(<TestWrapper />)
    expect(container.textContent).not.toContain("erroneous render")
    // Look for the error message content instead of specific CSS class
    expect(container.textContent).toContain("Something Went Wrong")
  })

  it("shows error page when the error kind is AsyncChunkLoadError", () => {
    let errorBoundaryInstance: any = null
    const TestWrapper = () => {
      return (
        <ErrorBoundary
          ref={ref => {
            errorBoundaryInstance = ref
          }}
        >
          <div>erroneous render</div>
        </ErrorBoundary>
      )
    }

    const { container, rerender } = render(<TestWrapper />)

    act(() => {
      if (errorBoundaryInstance) {
        errorBoundaryInstance.setState({
          kind: "AsyncChunkLoadError",
          message: "Loading chunk failed",
        })
      }
    })

    rerender(<TestWrapper />)
    expect(container.textContent).not.toContain("erroneous render")
    // Look for the error message content instead of specific CSS class
    expect(container.textContent).toContain("Error Loading Script")
  })

  it("derives state for a generic error", () => {
    const state = ErrorBoundary.getDerivedStateFromError({
      name: "error",
      message: "generic error",
    })

    expect(state.kind).toBe("GenericError")
    expect(state.message).toContain("generic error")
  })

  it("derives state for an async chunk load error", () => {
    const state = ErrorBoundary.getDerivedStateFromError({
      name: "error",
      message: "Loading chunk c3495.js failed",
    })

    expect(state.kind).toBe("AsyncChunkLoadError")
    expect(state.message).toContain("Loading chunk c3495.js failed")
  })
})
