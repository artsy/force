import { useEffect, useRef } from "react"

interface UseTrendingImpressionSessionProps {
  /** Whether the trending panel is currently shown */
  isPanelVisible: boolean
  /**
   * While true the session continues; when it turns false the session ends
   * and the next panel appearance counts as a fresh impression. Hosts whose
   * whole surface unmounts per session (the mobile overlay) can pass true.
   */
  isSessionActive: boolean
}

/**
 * Rail impressions should count once per panel session, even though
 * TrendingSearches remounts whenever the search query crosses the
 * autosuggest threshold. Hosts pass the returned flag as the panel's
 * `shouldTrackImpressions` prop.
 */
export const useTrendingImpressionSession = ({
  isPanelVisible,
  isSessionActive,
}: UseTrendingImpressionSessionProps): boolean => {
  const hasTrackedRef = useRef(false)

  useEffect(() => {
    if (isPanelVisible) {
      hasTrackedRef.current = true
    } else if (!isSessionActive) {
      hasTrackedRef.current = false
    }
  }, [isPanelVisible, isSessionActive])

  return !hasTrackedRef.current
}
