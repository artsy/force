import {
  type RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

/** Default dwell time (ms) before an impression event is emitted. */
export const DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS = 1000

/**
 * How much of the target must be on screen, expressed as a fraction of the
 * maximum visible ratio physically achievable for the target.
 */
export const DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK = 0.98

export const RAIL_IMPRESSION_INTERSECTION_THRESHOLDS = Array.from(
  { length: 21 },
  (_, i) => i / 20,
)

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

export function meetsRailVisibilityRequirement(
  entry: IntersectionObserverEntry,
  coverageSlack: number,
): boolean {
  if (!entry.isIntersecting) return false
  const required = requiredVisibilityRatio(entry, coverageSlack)
  // Guards against floating-point drift where the browser reports e.g.
  // 0.9999999 when the element is exactly at the threshold.
  return entry.intersectionRatio + 1e-6 >= required
}

interface UseDwellImpressionTrackingOptions {
  disabled?: boolean
  onImpression: () => void
  visibilityDurationMs?: number
  visibilityCoverageSlack?: number
}

interface UseDwellImpressionTrackingResult {
  impressionRef: RefCallback<HTMLDivElement>
}

export const useDwellImpressionTracking = ({
  disabled = false,
  onImpression,
  visibilityDurationMs = DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS,
  visibilityCoverageSlack = DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
}: UseDwellImpressionTrackingOptions): UseDwellImpressionTrackingResult => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const impressionRef = useCallback((node: HTMLDivElement | null) => {
    setElement(node)
  }, [])

  const onImpressionRef = useRef(onImpression)
  onImpressionRef.current = onImpression

  useEffect(() => {
    if (disabled) return
    if (!element || typeof IntersectionObserver === "undefined") return

    let hasTracked = false
    let timer: ReturnType<typeof setTimeout> | null = null
    const meetsRequirementRef = { current: false }
    const observerRef: { current: IntersectionObserver | null } = {
      current: null,
    }

    const emit = () => {
      if (hasTracked) return
      hasTracked = true
      onImpressionRef.current()
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
  }, [disabled, element, visibilityCoverageSlack, visibilityDurationMs])

  return { impressionRef }
}
