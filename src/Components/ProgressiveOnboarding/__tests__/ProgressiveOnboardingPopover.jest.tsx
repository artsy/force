import { render, screen, waitFor } from "@testing-library/react"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { useProgressiveOnboardingTracking } from "Components/ProgressiveOnboarding/useProgressiveOnboardingTracking"

jest.mock("Utils/device", () => ({
  isTouch: false,
}))

jest.mock(
  "Components/ProgressiveOnboarding/useProgressiveOnboardingTracking",
  () => ({
    useProgressiveOnboardingTracking: jest.fn(),
  }),
)

jest.mock("@artsy/palette", () => {
  const actual = jest.requireActual("@artsy/palette")
  return {
    ...actual,
    Box: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
    Popover: ({ visible, popover, children }: any) => (
      <div data-testid="popover" data-visible={String(visible)}>
        {visible
          ? typeof popover === "function"
            ? popover({ onHide: jest.fn() })
            : popover
          : null}

        {typeof children === "function"
          ? children({ anchorRef: () => null })
          : children}
      </div>
    ),
  }
})

describe("ProgressiveOnboardingPopover", () => {
  let mockTrackEvent: jest.Mock

  beforeEach(() => {
    mockTrackEvent = jest.fn()
    jest.clearAllMocks()
    ;(useProgressiveOnboardingTracking as jest.Mock).mockReturnValue({
      trackEvent: mockTrackEvent,
    })
  })

  it("fires tracking event when tooltip is visible by default (no visible prop)", async () => {
    render(
      <ProgressiveOnboardingPopover
        name="test-tooltip"
        popover={<div>Tooltip content</div>}
      >
        <button type="button">Test Button</button>
      </ProgressiveOnboardingPopover>,
    )

    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByText("Test Button")).toBeInTheDocument()
    expect(screen.getByTestId("popover")).toHaveAttribute(
      "data-visible",
      "true",
    )
    expect(screen.getByText("Tooltip content")).toBeInTheDocument()
  })

  it("fires tracking event when visible prop is true", async () => {
    render(
      <ProgressiveOnboardingPopover
        name="test-tooltip"
        visible={true}
        popover={<div>Tooltip content</div>}
      >
        <button type="button">Test Button</button>
      </ProgressiveOnboardingPopover>,
    )

    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByTestId("popover")).toHaveAttribute(
      "data-visible",
      "true",
    )
    expect(screen.getByText("Tooltip content")).toBeInTheDocument()
  })

  it("does NOT fire tracking event when visible prop is false", async () => {
    render(
      <ProgressiveOnboardingPopover
        name="test-tooltip"
        visible={false}
        popover={<div>Tooltip content</div>}
      >
        <button type="button">Test Button</button>
      </ProgressiveOnboardingPopover>,
    )

    // Give effects a chance to run if they were going to
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledTimes(0)
    })

    expect(screen.getByText("Test Button")).toBeInTheDocument()
    expect(screen.getByTestId("popover")).toHaveAttribute(
      "data-visible",
      "false",
    )
    expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument()
  })

  it("respects visible prop for rendering the popover", () => {
    const { rerender } = render(
      <ProgressiveOnboardingPopover
        name="test-tooltip"
        visible={true}
        popover={<div>Tooltip content</div>}
      >
        <button type="button">Test Button</button>
      </ProgressiveOnboardingPopover>,
    )

    expect(screen.getByText("Tooltip content")).toBeInTheDocument()

    rerender(
      <ProgressiveOnboardingPopover
        name="test-tooltip"
        visible={false}
        popover={<div>Tooltip content</div>}
      >
        <button type="button">Test Button</button>
      </ProgressiveOnboardingPopover>,
    )

    expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument()
    expect(screen.getByText("Test Button")).toBeInTheDocument()
  })

  it("calls useProgressiveOnboardingTracking with correct name parameter", () => {
    render(
      <ProgressiveOnboardingPopover
        name="alert-create"
        popover={<div>Tooltip content</div>}
      >
        <button type="button">Test Button</button>
      </ProgressiveOnboardingPopover>,
    )

    expect(useProgressiveOnboardingTracking).toHaveBeenCalledWith({
      name: "alert-create",
    })
  })
})
