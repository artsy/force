import { act, render, screen } from "@testing-library/react"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import {
  DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
  RAIL_IMPRESSION_INTERSECTION_THRESHOLDS,
  useRailImpressionTracking,
} from "Components/RailImpression/useRailImpressionTracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type * as React from "react"
import { useTracking } from "react-tracking"
import { intersect } from "Utils/Hooks/__tests__/mockIntersectionObserver"

jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext")

const mockDomRect = (height: number, width: number): DOMRectReadOnly =>
  ({
    height,
    width,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }) as DOMRectReadOnly

const TestRail: React.FC<{
  disabled?: boolean
  visibilityDurationMs?: number
  positionY?: number
  visibilityCoverageSlack?: number
}> = ({
  disabled,
  visibilityDurationMs,
  positionY,
  visibilityCoverageSlack = DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
}) => {
  const { railImpressionRef } = useRailImpressionTracking({
    contextModule: ContextModule.artworkRecommendationsRail,
    disabled,
    visibilityDurationMs,
    positionY,
    visibilityCoverageSlack,
  })

  return (
    <div ref={railImpressionRef} data-testid="rail-root">
      rail
    </div>
  )
}

describe("useRailImpressionTracking", () => {
  const mockTrackEvent = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    ;(useTracking as jest.Mock).mockReturnValue({ trackEvent: mockTrackEvent })
    ;(useAnalyticsContext as jest.Mock).mockReturnValue({
      contextPageOwnerType: OwnerType.home,
    })
    mockTrackEvent.mockClear()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("fires railViewed after the rail stays in view for visibilityDurationMs", () => {
    render(<TestRail visibilityDurationMs={500} />)

    const root = screen.getByTestId("rail-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(499))
    expect(mockTrackEvent).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))
    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.railViewed,
      context_module: ContextModule.artworkRecommendationsRail,
      context_screen: OwnerType.home,
    })
  })

  it("does not fire if the rail leaves the viewport before visibilityDurationMs", () => {
    render(<TestRail visibilityDurationMs={1000} />)

    const root = screen.getByTestId("rail-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(500))
    act(() => intersect(root, false))
    act(() => jest.advanceTimersByTime(1000))

    expect(mockTrackEvent).not.toHaveBeenCalled()
  })

  it("fires only once after the dwell threshold is met", () => {
    render(<TestRail visibilityDurationMs={100} />)

    const root = screen.getByTestId("rail-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))
    expect(mockTrackEvent).toHaveBeenCalledTimes(1)

    act(() => intersect(root, false))
    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(500))

    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
  })

  it("includes position_y when provided", () => {
    render(<TestRail visibilityDurationMs={100} positionY={3} />)

    const root = screen.getByTestId("rail-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ position_y: 3 }),
    )
  })

  it("does not observe or fire when disabled", () => {
    render(<TestRail disabled visibilityDurationMs={100} />)

    const root = screen.getByTestId("rail-root")

    expect(IntersectionObserver).not.toHaveBeenCalled()

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).not.toHaveBeenCalled()
  })

  it("registers IntersectionObserver with 5% step ratio thresholds", () => {
    render(<TestRail />)

    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: RAIL_IMPRESSION_INTERSECTION_THRESHOLDS,
      }),
    )
    expect(RAIL_IMPRESSION_INTERSECTION_THRESHOLDS).toEqual([
      0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
      0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
    ])
  })

  it("does not fire when only part of a short rail is visible", () => {
    render(<TestRail visibilityDurationMs={100} />)

    const root = screen.getByTestId("rail-root")

    act(() =>
      intersect(root, true, {
        intersectionRatio: 0.5,
        boundingClientRect: mockDomRect(400, 100),
        rootBounds: mockDomRect(800, 400),
      }),
    )
    act(() => jest.advanceTimersByTime(200))

    expect(mockTrackEvent).not.toHaveBeenCalled()
  })

  it("fires for a tall rail when roughly as much as can fit is visible", () => {
    render(<TestRail visibilityDurationMs={100} />)

    const root = screen.getByTestId("rail-root")
    const rootH = 800
    const targetH = 2500
    const maxRatio = rootH / targetH
    const required = maxRatio * DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK

    act(() =>
      intersect(root, true, {
        intersectionRatio: required + 0.02,
        boundingClientRect: mockDomRect(targetH, 100),
        rootBounds: mockDomRect(rootH, 400),
      }),
    )
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
  })

  it("warns at most once when analytics context screen is missing", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
    ;(useAnalyticsContext as jest.Mock).mockReturnValue({
      contextPageOwnerType: undefined,
    })

    const { rerender } = render(<TestRail visibilityDurationMs={100} />)
    rerender(<TestRail visibilityDurationMs={200} />)

    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(
      "Missing analytics context for rail impression",
    )
    warn.mockRestore()
  })
})
