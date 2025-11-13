import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { ActionType, type TooltipViewed } from "@artsy/cohesion"
import { useCallback } from "react"
import { useTracking } from "react-tracking"

interface UseProgressiveOnboardingTracking {
  name: string
}

export const useProgressiveOnboardingTracking = ({
  name,
}: UseProgressiveOnboardingTracking) => {
  const analytics = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const trackEvent = useCallback(() => {
    if (
      (!contextPageOwnerId && !contextPageOwnerSlug) ||
      !contextPageOwnerType
    ) {
      console.warn("Missing analytics context")
      return
    }

    const payload: TooltipViewed = {
      action: ActionType.tooltipViewed,
      context_owner_id: contextPageOwnerId ?? "unknown",
      context_owner_slug: contextPageOwnerSlug ?? "unknown",
      context_owner_type: contextPageOwnerType,
      type: name,
    }

    analytics.trackEvent(payload)
  }, [
    analytics,
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
    name,
  ])

  return { trackEvent }
}
