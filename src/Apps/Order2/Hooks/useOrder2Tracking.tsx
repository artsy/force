import {
  ActionType,
  ClickedAskSpecialist,
  ClickedBuyerProtection,
  ClickedVisitHelpCenter,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { Order2HelpLinks_order$data } from "__generated__/Order2HelpLinks_order.graphql"
import { useMemo } from "react"
import { useTracking } from "react-tracking"

export const useOrder2Tracking = () => {
  const { trackEvent } = useTracking()
  const analytics = useAnalyticsContext()

  const contextPageOwnerId = analytics.contextPageOwnerId as string
  const contextPageOwnerSlug = analytics.contextPageOwnerSlug as string
  const contextPageOwnerType = analytics.contextPageOwnerType as PageOwnerType

  const tracks = useMemo(() => {
    return {
      clickedAskSpecialist: (
        contextModule: ContextModule,
        orderType: Order2HelpLinks_order$data["mode"],
      ) => {
        const payload: ClickedAskSpecialist = {
          action: ActionType.clickedAskSpecialist,
          context_module: contextModule,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_type: contextPageOwnerType,
          flow: orderType === "OFFER" ? "make offer" : "buy now",
        }

        trackEvent(payload)
      },
      clickedVisitHelpCenter: (
        contextModule: ContextModule,
        orderType: Order2HelpLinks_order$data["mode"],
      ) => {
        const payload: ClickedVisitHelpCenter = {
          action: ActionType.clickedVisitHelpCenter,
          context_module: contextModule,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_type: contextPageOwnerType,
          destination_page_owner_type: OwnerType.articles,
          destination_page_owner_slug: "0TO3b000000UessGAC/buy",
          flow: orderType === "OFFER" ? "Make offer" : "Buy now",
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
    }
  }, [
    trackEvent,
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  ])

  return tracks
}
