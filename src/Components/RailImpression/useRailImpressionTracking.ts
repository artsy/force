import {
  ActionType,
  type ContextModule,
  type OwnerType,
  type RailViewed,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS,
  DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
  RAIL_IMPRESSION_INTERSECTION_THRESHOLDS,
  meetsRailVisibilityRequirement,
  useDwellImpressionTracking,
} from "Components/RailImpression/useDwellImpressionTracking"
import { type RefCallback, useEffect, useRef } from "react"
import { useTracking } from "react-tracking"

export {
  DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS,
  DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
  RAIL_IMPRESSION_INTERSECTION_THRESHOLDS,
  meetsRailVisibilityRequirement,
}

export interface UseRailImpressionTrackingOptions {
  contextModule: ContextModule
  /**
   * Use when a shared component should only track impressions in specific
   * placements. For example, MyBids tracks on home when it receives a
   * `railPositionY`, but not when reused on the auctions page.
   */
  disabled?: boolean
  /**
   * Minimum time the rail root must remain intersecting the viewport before
   * {@link RailViewed} fires. Defaults to {@link DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS}.
   */
  visibilityDurationMs?: number
  /**
   * How close to the best possible visibility we require (see
   * {@link DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK}).
   */
  visibilityCoverageSlack?: number
  positionY?: number
}

export interface UseRailImpressionTrackingResult {
  /** Attach to the rail root element (e.g. Palette `Box`). */
  railImpressionRef: RefCallback<HTMLDivElement>
}

/**
 * Fires {@link ActionType.railViewed} once per mount after the rail stays
 * sufficiently visible for `visibilityDurationMs`. Short sections must be
 * almost fully in view; tall sections must show roughly as much as can fit.
 *
 * Flow:
 *   1. The IntersectionObserver wakes on each 5% visibility step (see
 *      {@link RAIL_IMPRESSION_INTERSECTION_THRESHOLDS}).
 *   2. For each entry we re-compute the required ratio for the current
 *      element/viewport heights (see {@link requiredVisibilityRatio}). The
 *      rail can grow/shrink as content loads, so we can't cache this.
 *   3. When the requirement is met, start a `visibilityDurationMs` dwell
 *      timer. If visibility drops below the requirement before it fires,
 *      cancel the timer.
 *   4. If the requirement stays met for the full duration, emit the event
 *      and disconnect the observer — we never fire twice per mount.
 */
export const useRailImpressionTracking = ({
  contextModule,
  disabled = false,
  visibilityDurationMs = DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS,
  visibilityCoverageSlack = DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
  positionY,
}: UseRailImpressionTrackingOptions): UseRailImpressionTrackingResult => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const missingContextWarnedRef = useRef(false)

  useEffect(() => {
    if (disabled) return
    if (contextPageOwnerType) return
    if (missingContextWarnedRef.current) return
    missingContextWarnedRef.current = true
    console.warn("Missing analytics context for rail impression")
  }, [contextPageOwnerType, disabled])

  const { impressionRef } = useDwellImpressionTracking({
    disabled: disabled || !contextPageOwnerType,
    visibilityDurationMs,
    visibilityCoverageSlack,
    onImpression: () => {
      const payload: RailViewed = {
        action: ActionType.railViewed,
        context_module: contextModule,
        context_screen: contextPageOwnerType as OwnerType,
        ...(positionY !== undefined ? { position_y: positionY } : {}),
      }

      trackEvent(payload)
    },
  })

  return { railImpressionRef: impressionRef }
}
