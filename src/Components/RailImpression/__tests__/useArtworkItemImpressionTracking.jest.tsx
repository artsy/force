import { act, render, screen } from "@testing-library/react"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useArtworkItemImpressionTracking } from "Components/RailImpression/useArtworkItemImpressionTracking"
import { DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK } from "Components/RailImpression/useRailImpressionTracking"
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

const TestItem: React.FC<{
  contextScreen?: OwnerType
  disabled?: boolean
  itemID?: string
  position?: number
  visibilityDurationMs?: number
  visibilityCoverageSlack?: number
}> = ({
  contextScreen = OwnerType.home,
  disabled,
  itemID = "artwork-1-id",
  position = 0,
  visibilityDurationMs,
  visibilityCoverageSlack = DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
}) => {
  const { itemImpressionRef } = useArtworkItemImpressionTracking({
    contextModule: ContextModule.newWorksForYouRail,
    contextScreen,
    disabled,
    itemID,
    position,
    visibilityDurationMs,
    visibilityCoverageSlack,
  })

  return (
    <div ref={itemImpressionRef} data-testid="item-root">
      artwork
    </div>
  )
}

describe("useArtworkItemImpressionTracking", () => {
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

  it("fires itemViewed after the artwork stays in view for visibilityDurationMs", () => {
    render(<TestItem visibilityDurationMs={500} />)

    const root = screen.getByTestId("item-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(499))
    expect(mockTrackEvent).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))
    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.itemViewed,
      context_module: ContextModule.newWorksForYouRail,
      context_screen: OwnerType.home,
      item_id: "artwork-1-id",
      item_type: "artwork",
      position: 0,
    })
  })

  it("does not fire if the artwork leaves the viewport before visibilityDurationMs", () => {
    render(<TestItem visibilityDurationMs={1000} />)

    const root = screen.getByTestId("item-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(500))
    act(() => intersect(root, false))
    act(() => jest.advanceTimersByTime(1000))

    expect(mockTrackEvent).not.toHaveBeenCalled()
  })

  it("fires only once for the same mounted artwork", () => {
    render(<TestItem visibilityDurationMs={100} />)

    const root = screen.getByTestId("item-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))
    expect(mockTrackEvent).toHaveBeenCalledTimes(1)

    act(() => intersect(root, false))
    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(500))

    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
  })

  it("starts tracking again after unmount and remount", () => {
    const { unmount } = render(<TestItem visibilityDurationMs={100} />)

    act(() => intersect(screen.getByTestId("item-root"), true))
    act(() => jest.advanceTimersByTime(100))
    expect(mockTrackEvent).toHaveBeenCalledTimes(1)

    unmount()

    render(<TestItem visibilityDurationMs={100} />)

    act(() => intersect(screen.getByTestId("item-root"), true))
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).toHaveBeenCalledTimes(2)
  })

  it("includes position when provided", () => {
    render(<TestItem position={3} visibilityDurationMs={100} />)

    const root = screen.getByTestId("item-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ position: 3 }),
    )
  })

  it("does not observe or fire when disabled", () => {
    render(<TestItem disabled visibilityDurationMs={100} />)

    const root = screen.getByTestId("item-root")

    expect(IntersectionObserver).not.toHaveBeenCalled()

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).not.toHaveBeenCalled()
  })

  it("does not observe or fire outside the home screen", () => {
    ;(useAnalyticsContext as jest.Mock).mockReturnValue({
      contextPageOwnerType: OwnerType.artist,
    })

    render(<TestItem visibilityDurationMs={100} />)

    const root = screen.getByTestId("item-root")

    expect(IntersectionObserver).not.toHaveBeenCalled()

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).not.toHaveBeenCalled()
  })

  it("fires on a configured non-home screen", () => {
    ;(useAnalyticsContext as jest.Mock).mockReturnValue({
      contextPageOwnerType: OwnerType.artworkRecommendations,
    })

    render(
      <TestItem
        contextScreen={OwnerType.artworkRecommendations}
        visibilityDurationMs={100}
      />,
    )

    const root = screen.getByTestId("item-root")

    act(() => intersect(root, true))
    act(() => jest.advanceTimersByTime(100))

    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.itemViewed,
      context_module: ContextModule.newWorksForYouRail,
      context_screen: OwnerType.artworkRecommendations,
      item_id: "artwork-1-id",
      item_type: "artwork",
      position: 0,
    })
  })

  it("fires for a tall item when roughly as much as can fit is visible", () => {
    render(<TestItem visibilityDurationMs={100} />)

    const root = screen.getByTestId("item-root")
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
})
