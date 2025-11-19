import { Theme } from "@artsy/palette"
import { DeveloperBreakpointOverlay } from "Components/DeveloperBreakpointOverlay"
import { act, render, screen } from "@testing-library/react"

describe("DeveloperBreakpointOverlay", () => {
  const originalNodeEnv = process.env.NODE_ENV

  const renderComponent = () => {
    return render(
      <Theme>
        <DeveloperBreakpointOverlay />
      </Theme>,
    )
  }

  beforeEach(() => {
    // Mock development environment
    process.env.NODE_ENV = "development"

    // Set initial window dimensions
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 768,
    })
  })

  afterEach(() => {
    // Restore original NODE_ENV
    process.env.NODE_ENV = originalNodeEnv
  })

  it("should not render by default", () => {
    renderComponent()
    expect(
      screen.queryByText(/Ctrl\+Shift\+B to toggle/),
    ).not.toBeInTheDocument()
  })

  it("should show overlay when window is resized", () => {
    renderComponent()

    act(() => {
      window.innerWidth = 800
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.getByText(/Ctrl\+Shift\+B to toggle/)).toBeInTheDocument()
  })

  it("should toggle overlay with Ctrl+Shift+B", () => {
    renderComponent()

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    expect(screen.getByText(/Ctrl\+Shift\+B to toggle/)).toBeInTheDocument()
  })

  it("should display correct breakpoint for different viewport sizes", () => {
    renderComponent()

    // Show overlay
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    // Check for xs breakpoint (< 768px)
    act(() => {
      window.innerWidth = 400
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.getByText("xs")).toBeInTheDocument()

    // Check for sm breakpoint (768px - 1279px)
    act(() => {
      window.innerWidth = 1000
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.getByText("sm")).toBeInTheDocument()

    // Check for md breakpoint (1280px - 1919px)
    act(() => {
      window.innerWidth = 1500
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.getByText("md")).toBeInTheDocument()

    // Check for lg breakpoint (>= 1920px)
    act(() => {
      window.innerWidth = 2000
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.getByText("lg")).toBeInTheDocument()
  })

  it("should display viewport dimensions", () => {
    renderComponent()

    act(() => {
      window.innerWidth = 1024
      window.innerHeight = 768
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    expect(screen.getByText("1024 × 768")).toBeInTheDocument()
  })

  it("should not render in production", () => {
    process.env.NODE_ENV = "production"
    renderComponent()

    // Trigger resize to try to show overlay
    act(() => {
      window.dispatchEvent(new Event("resize"))
    })

    expect(
      screen.queryByText(/Ctrl\+Shift\+B to toggle/),
    ).not.toBeInTheDocument()
  })
})
