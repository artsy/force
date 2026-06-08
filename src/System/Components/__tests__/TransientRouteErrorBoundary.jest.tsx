import { TransientRouteErrorBoundary } from "System/Components/TransientRouteErrorBoundary"
import { render, screen } from "@testing-library/react"
import { HttpError } from "found"
import * as React from "react"

// Stand-in for the surrounding ContentErrorBoundary: records anything the
// transient boundary re-throws.
class OuterBoundary extends React.Component<
  { children?: React.ReactNode },
  { caught: boolean }
> {
  state = { caught: false }

  static getDerivedStateFromError(): { caught: boolean } {
    return { caught: true }
  }

  render(): React.ReactNode {
    if (this.state.caught) {
      return <div>Outer boundary caught</div>
    }
    return this.props.children
  }
}

const Throw: React.FC<{ error: Error | HttpError }> = ({ error }) => {
  throw error
}

const renderWithin = (
  pathname: string,
  child: React.ReactNode,
): ReturnType<typeof render> => {
  return render(
    <OuterBoundary>
      <TransientRouteErrorBoundary pathname={pathname}>
        {child}
      </TransientRouteErrorBoundary>
    </OuterBoundary>,
  )
}

const setLocation = (pathname: string): void => {
  window.history.replaceState({}, "", pathname)
}

describe("TransientRouteErrorBoundary", () => {
  const errorLog = console.error

  beforeAll(() => {
    console.error = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    setLocation("/")
  })

  afterAll(() => {
    console.error = errorLog
  })

  it("renders children when there is no error", () => {
    setLocation("/page-1")

    renderWithin("/page-1", <div>Route content</div>)

    expect(screen.getByText("Route content")).toBeInTheDocument()
    expect(screen.queryByText("Outer boundary caught")).not.toBeInTheDocument()
  })

  it("swallows a transient crash during navigation and recovers on the next route", () => {
    // URL already advanced to the destination; committed pathname still old.
    setLocation("/page-2")

    const { rerender } = renderWithin(
      "/page-1",
      <Throw error={new Error("transient null")} />,
    )

    // Rendered nothing, did not bubble to the outer boundary.
    expect(screen.queryByText("Outer boundary caught")).not.toBeInTheDocument()

    // The new route commits.
    rerender(
      <OuterBoundary>
        <TransientRouteErrorBoundary pathname="/page-2">
          <div>Recovered content</div>
        </TransientRouteErrorBoundary>
      </OuterBoundary>,
    )

    expect(screen.getByText("Recovered content")).toBeInTheDocument()
    expect(screen.queryByText("Outer boundary caught")).not.toBeInTheDocument()
  })

  it("re-throws a genuine crash (not navigating) to the outer boundary", () => {
    // URL matches committed pathname -> not navigating.
    setLocation("/page-1")

    renderWithin("/page-1", <Throw error={new Error("genuine crash")} />)

    expect(screen.getByText("Outer boundary caught")).toBeInTheDocument()
  })

  it("re-throws HttpErrors to the outer boundary even mid-navigation", () => {
    setLocation("/page-2")

    renderWithin("/page-1", <Throw error={new HttpError(404)} />)

    expect(screen.getByText("Outer boundary caught")).toBeInTheDocument()
  })

  it("re-throws chunk-load errors to the outer boundary even mid-navigation", () => {
    setLocation("/page-2")

    renderWithin(
      "/page-1",
      <Throw error={new Error("Loading chunk abc.js failed")} />,
    )

    expect(screen.getByText("Outer boundary caught")).toBeInTheDocument()
  })
})
