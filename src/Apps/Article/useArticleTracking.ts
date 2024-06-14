import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  Impression,
  ActionType,
  ContextModule,
  ClickedExternalNewsSource,
  ClickedSponsorLink,
  ClickedArticleShare,
  ClickedPlayVideo,
} from "@artsy/cohesion"

export const useArticleTracking = () => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  if (!contextPageOwnerId || !contextPageOwnerSlug || !contextPageOwnerType) {
    console.warn("Missing analytics context")
  }

  const context = {
    context_owner_id: contextPageOwnerId!,
    context_owner_slug: contextPageOwnerSlug!,
    context_owner_type: contextPageOwnerType!,
  }

  return {
    displayedAd: () => {
      const payload: Impression = {
        action: ActionType.impression,
        context_module: ContextModule.adServer,
        ...context,
      }

      trackEvent(payload)
    },

    clickedExternalNewsSource: (url: string) => {
      const payload: ClickedExternalNewsSource = {
        action: ActionType.clickedExternalNewsSource,
        destination_path: url,
        ...context,
      }

      trackEvent(payload)
    },

    clickedSponsorLink: (url: string) => {
      const payload: ClickedSponsorLink = {
        action: ActionType.clickedSponsorLink,
        destination_path: url,
        ...context,
      }

      trackEvent(payload)
    },

    clickedArticleShare: () => {
      const payload: ClickedArticleShare = {
        action: ActionType.clickedArticleShare,
        ...context,
      }

      trackEvent(payload)
    },

    clickedPlayVideo: () => {
      const payload: ClickedPlayVideo = {
        action: ActionType.clickedPlayVideo,
        ...context,
      }

      trackEvent(payload)
    },
  }
}
