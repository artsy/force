import {
  ActionType,
  type ClickedAskSpecialist,
  type ClickedBuyerProtection,
  type ClickedCompleteYourProfile,
  type ClickedContactGallery,
  type ClickedImportFees,
  type ClickedVisitHelpCenter,
  ContextModule,
  type OrderDetailsViewed,
  OwnerType,
  type PageOwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { DisplayTextsMessageTypeEnum } from "__generated__/OrderDetailsMessage_order.graphql"
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

      clickedContactGallery: (orderId: string) => {
        const payload: ClickedContactGallery = {
          action: ActionType.clickedContactGallery,
          context_owner_type: OwnerType.ordersDetail,
          context_owner_id: orderId,
        }
        trackEvent(payload)
      },
      orderDetailsViewed: (
        contextModule: ContextModule,
        messageType: DisplayTextsMessageTypeEnum,
      ) => {
        const payload: OrderDetailsViewed = {
          action: ActionType.orderDetailsViewed,
          context_module: contextModule,
          context_owner_id: contextPageOwnerId,
          context_owner_type: contextPageOwnerType,
          message_type: messageType,
        }

        trackEvent(payload)
      },
      clickedCompleteYourProfile: () => {
        const payload: ClickedCompleteYourProfile = {
          action: ActionType.clickedCompleteYourProfile,
          context_module: ContextModule.ordersDetail,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
        }

        trackEvent(payload)
      },
    }
  }, [trackEvent, contextPageOwnerId, contextPageOwnerType, flow])

  return tracks
}
