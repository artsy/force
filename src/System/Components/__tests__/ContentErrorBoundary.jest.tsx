import { ContentErrorBoundary } from "System/Components/ContentErrorBoundary"
import { render, screen } from "@testing-library/react"
import { HttpError } from "found"
import { act } from "react"

jest.mock("Utils/getENV", () => ({
  getENV: () => "development",
}))

const mockCaptureException = jest.fn()
const mockSetContext = jest.fn()
const mockSetTag = jest.fn()

jest.mock("@sentry/browser", () => ({
  captureException: (...args: unknown[]) => mockCaptureException(...args),
  withScope: (cb: (scope: unknown) => void) =>
    cb({
      setContext: mockSetContext,
      setTag: mockSetTag,
    }),
}))

describe("ContentErrorBoundary", () => {
  const errorLog = console.error

  beforeAll(() => {
    console.error = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    console.error = errorLog
  })

  it("renders children normally when no error", () => {
    render(
      <ContentErrorBoundary pathname="/test">
        <div>Hello World</div>
      </ContentErrorBoundary>
    )

    expect(screen.getByText("Hello World")).toBeInTheDocument()
  })

  it("shows 404 ErrorPage for HttpError(404)", () => {
    const ErrorComponent = () => {
      throw new HttpError(404)
    }

    render(
      <ContentErrorBoundary pathname="/test">
        <ErrorComponent />
      </ContentErrorBoundary>
    )

    expect(screen.getByTestId("error-page")).toBeInTheDocument()
    expect(screen.getByText("404")).toBeInTheDocument()
  })

  it("shows 'Something Went Wrong' with Reload button for generic errors", () => {
    const ErrorComponent = () => {
      throw new Error("test error")
    }

    render(
      <ContentErrorBoundary pathname="/test">
        <ErrorComponent />
      </ContentErrorBoundary>
    )

    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument()
    expect(screen.getByText("Reload")).toBeInTheDocument()
  })

  it("re-throws AsyncChunkLoadError to outer boundary", () => {
    const ErrorComponent = () => {
      throw new Error("Loading chunk abc123.js failed")
    }

    const OuterBoundary = ({ children }: { children: React.ReactNode }) => {
      try {
        return <>{children}</>
      } catch {
        return null
      }
    }

    // The re-throw from render() should propagate to the outer boundary
    expect(() => {
      render(
        <OuterBoundary>
          <ContentErrorBoundary pathname="/test">
            <ErrorComponent />
          </ContentErrorBoundary>
        </OuterBoundary>
      )
    }).toThrow("Loading chunk abc123.js failed")
  })

  it("resets error state when pathname changes", () => {
    let errorBoundaryInstance: ContentErrorBoundary | null = null

    const { rerender } = render(
      <ContentErrorBoundary
        pathname="/page-1"
        ref={ref => {
          errorBoundaryInstance = ref
        }}
      >
        <div>Content</div>
      </ContentErrorBoundary>
    )

    // Simulate an error state
    act(() => {
      errorBoundaryInstance?.setState({
        kind: "GenericError",
        message: "Test error",
      })
    })

    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument()

    // Navigate to a new pathname
    rerender(
      <ContentErrorBoundary
        pathname="/page-2"
        ref={ref => {
          errorBoundaryInstance = ref
        }}
      >
        <div>Content</div>
      </ContentErrorBoundary>
    )

    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("keeps error state when pathname stays the same", () => {
    let errorBoundaryInstance: ContentErrorBoundary | null = null

    const { rerender } = render(
      <ContentErrorBoundary
        pathname="/page-1"
        ref={ref => {
          errorBoundaryInstance = ref
        }}
      >
        <div>Content</div>
      </ContentErrorBoundary>
    )

    act(() => {
      errorBoundaryInstance?.setState({
        kind: "GenericError",
        message: "Test error",
      })
    })

    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument()

    // Re-render with same pathname
    rerender(
      <ContentErrorBoundary
        pathname="/page-1"
        ref={ref => {
          errorBoundaryInstance = ref
        }}
      >
        <div>Content</div>
      </ContentErrorBoundary>
    )

    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument()
  })

  it("reports to Sentry with errorBoundary: 'content' tag", () => {
    const ErrorComponent = () => {
      throw new Error("sentry test error")
    }

    render(
      <ContentErrorBoundary pathname="/test">
        <ErrorComponent />
      </ContentErrorBoundary>
    )

    expect(mockSetTag).toHaveBeenCalledWith("errorBoundary", "content")
    expect(mockCaptureException).toHaveBeenCalled()
  })

  it("skips Sentry reporting for AsyncChunkLoadError", () => {
    const ErrorComponent = () => {
      throw new Error("Loading chunk xyz.js failed")
    }

    expect(() => {
      render(
        <ContentErrorBoundary pathname="/test">
          <ErrorComponent />
        </ContentErrorBoundary>
      )
    }).toThrow()

    expect(mockCaptureException).not.toHaveBeenCalled()
  })
})
