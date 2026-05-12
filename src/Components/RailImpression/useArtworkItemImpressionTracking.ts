import {
  ActionType,
  type ContextModule,
  type ItemViewed,
  type OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS,
  DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
  useDwellImpressionTracking,
} from "Components/RailImpression/useDwellImpressionTracking"
import type { RefCallback } from "react"
import { useTracking } from "react-tracking"

interface UseArtworkItemImpressionTrackingOptions {
  contextModule: ContextModule
  contextScreen: OwnerType
  disabled?: boolean
  itemID: string
  position: number
  visibilityDurationMs?: number
  visibilityCoverageSlack?: number
}

interface UseArtworkItemImpressionTrackingResult {
  itemImpressionRef: RefCallback<HTMLDivElement>
}

export const useArtworkItemImpressionTracking = ({
  contextModule,
  contextScreen,
  disabled = false,
  itemID,
  position,
  visibilityDurationMs = DEFAULT_RAIL_IMPRESSION_VISIBILITY_MS,
  visibilityCoverageSlack = DEFAULT_RAIL_VISIBILITY_COVERAGE_SLACK,
}: UseArtworkItemImpressionTrackingOptions): UseArtworkItemImpressionTrackingResult => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const { impressionRef } = useDwellImpressionTracking({
    disabled: disabled || contextPageOwnerType !== contextScreen,
    visibilityDurationMs,
    visibilityCoverageSlack,
    onImpression: () => {
      const payload: ItemViewed = {
        action: ActionType.itemViewed,
        context_module: contextModule,
        context_screen: contextPageOwnerType as OwnerType,
        item_id: itemID,
        item_type: "artwork",
        position,
      }

      trackEvent(payload)
    },
  })

  return { itemImpressionRef: impressionRef }
}
