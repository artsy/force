import {
  ActionType,
  type ClickedAskSpecialist,
  type ClickedBuyerProtection,
  type ClickedContactGallery,
  type ClickedImportFees,
  type ClickedVisitHelpCenter,
  type ContextModule,
  OwnerType,
  type PageOwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useMemo } from "react"
import { useTracking } from "react-tracking"

export const useOrder2Tracking = (
  source: "PARTNER_OFFER" | unknown,
  mode: "BUY" | "OFFER" | unknown,
) => {
  const { trackEvent } = useTracking()

  const analytics = useAnalyticsContext()

  const contextPageOwnerId = analytics.contextPageOwnerId as string
  const contextPageOwnerType = analytics.contextPageOwnerType as PageOwnerType

  // Buy now, Make offer, or Partner offer
  const flow =
    mode === "OFFER"
      ? "Make offer"
      : source === "PARTNER_OFFER"
        ? "Partner offer"
        : "Buy now"

  const tracks = useMemo(() => {
    return {
      clickedAskSpecialist: (contextModule: ContextModule) => {
        const payload: ClickedAskSpecialist = {
          action: ActionType.clickedAskSpecialist,
          context_module: contextModule,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_type: contextPageOwnerType,
          flow,
        }

        trackEvent(payload)
      },
      clickedVisitHelpCenter: (contextModule: ContextModule) => {
        const payload: ClickedVisitHelpCenter = {
          action: ActionType.clickedVisitHelpCenter,
          context_module: contextModule,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_type: contextPageOwnerType,
          destination_page_owner_type: OwnerType.articles,
          destination_page_owner_slug: "0TO3b000000UessGAC/buy",
          flow,
        }

        trackEvent(payload)
      },
      clickedBuyerProtection: (contextModule: ContextModule) => {
        const payload: ClickedBuyerProtection = {
          action: ActionType.clickedBuyerProtection,
          context_module: contextModule,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_type: contextPageOwnerType,
          destination_page_owner_type: OwnerType.articles,
          destination_page_owner_slug: "The-Artsy-Guarantee",
        }

        trackEvent(payload)
      },

      clickedImportFees: (contextModule: ContextModule) => {
        const payload: ClickedImportFees = {
          action: ActionType.clickedImportFees,
          context_module: contextModule,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_type: contextPageOwnerType,
          destination_page_owner_type: OwnerType.articles,
          destination_page_owner_slug:
            "How-are-taxes-and-customs-fees-calculated",
          flow,
        }
        trackEvent(payload)
      },

      clickedContactGallery: (artwork: {
        slug: string
        internalID: string
      }) => {
        const payload: ClickedContactGallery = {
          action: ActionType.clickedContactGallery,
          context_owner_type: OwnerType.artwork,
          context_owner_slug: artwork.slug,
          context_owner_id: artwork.internalID,
        }
        trackEvent(payload)
      },
    }
  }, [trackEvent, contextPageOwnerId, contextPageOwnerType, flow])

  return tracks
}
