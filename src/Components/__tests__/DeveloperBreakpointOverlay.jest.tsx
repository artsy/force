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

  it("should not render by default (off mode)", () => {
    renderComponent()
    expect(screen.queryByText(/Cmd\+Shift\+B to cycle/)).not.toBeInTheDocument()
  })

  it("should cycle through modes: off -> auto -> on -> off", () => {
    renderComponent()

    // Start in off mode
    expect(screen.queryByText(/Cmd\+Shift\+B to cycle/)).not.toBeInTheDocument()

    // Press hotkey to switch to auto mode
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    // Auto mode doesn't show until resize
    expect(screen.queryByText(/Cmd\+Shift\+B to cycle/)).not.toBeInTheDocument()

    // Trigger resize to show in auto mode
    act(() => {
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.getByText(/Mode: auto/)).toBeInTheDocument()

    // Press hotkey to switch to on mode
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    expect(screen.getByText(/Mode: on/)).toBeInTheDocument()

    // Press hotkey to switch back to off mode
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    expect(screen.queryByText(/Cmd\+Shift\+B to cycle/)).not.toBeInTheDocument()
  })

  it("should show overlay when resizing in auto mode", () => {
    renderComponent()

    // Switch to auto mode
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    // Trigger resize
    act(() => {
      window.innerWidth = 800
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.getByText(/Mode: auto/)).toBeInTheDocument()
  })

  it("should stay visible in on mode without resize", () => {
    renderComponent()

    // Switch to auto mode
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    // Switch to on mode
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })

    expect(screen.getByText(/Mode: on/)).toBeInTheDocument()
  })

  it("should display correct breakpoint for different viewport sizes", () => {
    renderComponent()

    // Switch to on mode for always visible
    act(() => {
      // off -> auto
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
      // auto -> on
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
      // Switch to on mode
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
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

    // Try to activate overlay
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "KeyB",
          ctrlKey: true,
          shiftKey: true,
        }),
      )
      window.dispatchEvent(new Event("resize"))
    })

    expect(screen.queryByText(/Cmd\+Shift\+B to cycle/)).not.toBeInTheDocument()
  })
})
