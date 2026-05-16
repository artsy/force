import {
  ActionType,
  type ContextModule,
  type OwnerType,
  type RailViewed,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  type RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useTracking } from "react-tracking"

/** Default dwell time (ms) before a {@link RailViewed} event is emitted. */
export const DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS = 1000

/**
 * How much of the rail must be on screen, expressed as a fraction of the
 * **maximum visible ratio physically achievable** for the rail (not a fraction
 * of the rail itself). See {@link requiredVisibilityRatio} for the math.
 *
 * - Short rail (fits in viewport): max achievable ratio is 1.0, so we require
 *   ~98% of the rail visible. The 2% slack absorbs sub-pixel rounding,
 *   fractional device pixel ratios, sticky headers, etc. — without it,
 *   "fully visible" rails would never satisfy `intersectionRatio >= 1.0` on
 *   some browsers.
 * - Tall rail (taller than viewport, e.g. Market News at ~2500px in an 800px
 *   viewport): max achievable ratio is `viewportH / railH` ≈ 0.32, so we
 *   require ~0.98 × 0.32 ≈ 31% of the rail visible — i.e. the rail is filling
 *   roughly as much of the viewport as it possibly can.
 */
export const DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK = 0.98

/**
 * Thresholds passed to {@link IntersectionObserver}. The observer wakes our
 * callback whenever the target's visible fraction **crosses** one of these
 * values; with 21 evenly-spaced points (0%, 5%, 10%, …, 100%) we re-evaluate
 * roughly every 5% of visibility change.
 *
 * Why an array rather than a single threshold: the required ratio is computed
 * dynamically per-element (see {@link DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK}),
 * so we need wake-ups across the whole 0–1 range. Why 5% and not 1%: 1% steps
 * would fire ~100 callbacks per scroll-past — wasteful and finer than the
 * `0.98 × maxRatio` precision we actually need.
 */
export const RAIL_IMPRESSION_INTERSECTION_THRESHOLDS = Array.from(
  { length: 21 },
  (_, i) => i / 20,
)

/**
 * Minimum `intersectionRatio` the entry must meet to count as "in view."
 *
 *   maxAchievableRatio = min(1, viewportHeight / railHeight)
 *   required           = maxAchievableRatio * coverageSlack
 *
 * When the rail fits in the viewport, `maxAchievableRatio` is 1 and the result
 * is just `coverageSlack` (≈ 0.98). When the rail is taller than the viewport
 * the rail can never reach ratio 1, so we scale the requirement down to "as
 * much as can fit, minus the slack."
 *
 * Falls back to `coverageSlack` (the stricter short-rail threshold) when the
 * heights are missing or invalid — that's safe for short rails but means a
 * tall rail without `rootBounds` (rare iframe/SSR edge cases) won't fire.
 */
function requiredVisibilityRatio(
  entry: IntersectionObserverEntry,
  coverageSlack: number,
): number {
  const targetHeight = entry.boundingClientRect.height
  const rootHeight = entry.rootBounds?.height

  if (!Number.isFinite(targetHeight) || targetHeight <= 0) {
    return coverageSlack
  }
  if (
    rootHeight === undefined ||
    !Number.isFinite(rootHeight) ||
    rootHeight <= 0
  ) {
    return coverageSlack
  }

  const maxAchievableRatio = Math.min(1, rootHeight / targetHeight)
  return maxAchievableRatio * coverageSlack
}

function meetsRailVisibilityRequirement(
  entry: IntersectionObserverEntry,
  coverageSlack: number,
): boolean {
  if (!entry.isIntersecting) return false
  const required = requiredVisibilityRatio(entry, coverageSlack)
  // 1e-6 epsilon: guards against floating-point drift where the browser
  // reports e.g. 0.9999999 when the element is exactly at the threshold.
  return entry.intersectionRatio + 1e-6 >= required
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

  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const railImpressionRef = useCallback((node: HTMLDivElement | null) => {
    setElement(node)
  }, [])

  const trackEventRef = useRef(trackEvent)
  trackEventRef.current = trackEvent

  useEffect(() => {
    if (disabled) return
    if (!element || typeof IntersectionObserver === "undefined") {
      return
    }
    // Don't fire without a screen — would ship `context_screen: undefined`.
    // The effect re-runs when contextPageOwnerType resolves.
    if (!contextPageOwnerType) return

    let hasTracked = false
    let timer: ReturnType<typeof setTimeout> | null = null
    const meetsRequirementRef = { current: false }
    const observerRef: { current: IntersectionObserver | null } = {
      current: null,
    }

    const emit = () => {
      if (hasTracked) return
      hasTracked = true

      const payload: RailViewed = {
        action: ActionType.railViewed,
        context_module: contextModule,
        context_screen: contextPageOwnerType as OwnerType,
        ...(positionY !== undefined ? { position_y: positionY } : {}),
      }

      trackEventRef.current(payload)
      observerRef.current?.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        if (hasTracked) return

        const entry = entries[entries.length - 1]
        if (!entry) return

        const meets = meetsRailVisibilityRequirement(
          entry,
          visibilityCoverageSlack,
        )
        meetsRequirementRef.current = meets

        if (meets) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            if (hasTracked || !meetsRequirementRef.current) return
            emit()
          }, visibilityDurationMs)
        } else if (timer) {
          clearTimeout(timer)
          timer = null
        }
      },
      {
        threshold: RAIL_IMPRESSION_INTERSECTION_THRESHOLDS,
        root: null,
        rootMargin: "0px",
      },
    )

    observerRef.current.observe(element)

    return () => {
      observerRef.current?.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [
    contextModule,
    contextPageOwnerType,
    disabled,
    element,
    positionY,
    visibilityCoverageSlack,
    visibilityDurationMs,
  ])

  return { railImpressionRef }
}
