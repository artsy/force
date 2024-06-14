import { ActionType, TooltipViewed } from "@artsy/cohesion"
import { useEffect } from "react"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

interface UseProgressiveOnboardingTracking {
  name: string
}

export const useProgressiveOnboardingTracking = ({
  name,
}: UseProgressiveOnboardingTracking) => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  useEffect(() => {
    if (
      (!contextPageOwnerId && !contextPageOwnerSlug) ||
      !contextPageOwnerType
    ) {
      console.warn("Missing analytics context")
      return
    }

    const payload: TooltipViewed = {
      action: ActionType.tooltipViewed,
      context_owner_id: contextPageOwnerId!,
      context_owner_slug: contextPageOwnerSlug!,
      context_owner_type: contextPageOwnerType,
      type: name,
    }

    trackEvent(payload)
  }, [
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
    name,
    trackEvent,
  ])
}
