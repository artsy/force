import { useTracking } from "react-tracking"
import { AnalyticsSchema, useAnalyticsContext } from "v2/System/Analytics"

// TODO:
// - Page tracking?
// - Infinite scroll loading a new article? (previously we did a truncate and tracked the read more click)

// Not addressing (?):
// - Video header clicks (we don't display play/pause)
// - News expand/read more (not implemented)
// - Ad clicks — not possible (iframe) and never worked in the first place
// - Series footer HTML link clicks
// - Video duration, seconds

export const useArticleTracking = () => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  return {
    displayedAd: () => {
      trackEvent({
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        action_type: AnalyticsSchema.ActionType.Impression,
        context_page: AnalyticsSchema.PageName.ArticlePage,
        context_module: AnalyticsSchema.ContextModule.AdServer,
        context_page_owner_type: contextPageOwnerType,
      })
    },

    clickedExternalNewsSource: (url: string) => {
      trackEvent({
        action: "Click",
        type: "external link",
        label: "news source",
        destination_path: url,
      })
    },

    clickedSponsorLink: (url: string) => {
      trackEvent({
        action: "Click",
        type: "external_link",
        destination_path: url,
      })
    },

    clickedArticleShare: (service: string) => {
      trackEvent({
        action: "Click",
        type: "share",
        label: service,
      })
    },

    clickedPlayVideo: () => {
      trackEvent({
        action: "Click",
        label: "Play video",
      })
    },
  }
}
