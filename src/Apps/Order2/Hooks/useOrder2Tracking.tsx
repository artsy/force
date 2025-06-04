import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  ActionType,
  ClickedBuyerProtection,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useMemo } from "react"
import { useTracking } from "react-tracking"
import { Order2DetailsHelpLinks_order$data } from "__generated__/Order2DetailsHelpLinks_order.graphql"

export const useOrder2Tracking = () => {
  const { trackEvent } = useTracking()
  const analytics = useAnalyticsContext()

  const contextPageOwnerId = analytics.contextPageOwnerId as string
  const contextPageOwnerSlug = analytics.contextPageOwnerSlug as string
  const contextPageOwnerType = analytics.contextPageOwnerType as OwnerType

  const tracks = useMemo(() => {
    return {
      clickedAskSpecialist: (
        orderType: Order2DetailsHelpLinks_order$data["mode"],
      ) => {
        const payload = {
          action_type: DeprecatedSchema.ActionType.Click,
          subject: DeprecatedSchema.Subject.BNMOAskSpecialist,
          type: "button",
          flow: orderType === "OFFER" ? "make offer" : "buy now",
        }

        trackEvent(payload)
      },
      clickedReadFAQ: (
        orderType: Order2DetailsHelpLinks_order$data["mode"],
      ) => {
        const payload = {
          action_type: DeprecatedSchema.ActionType.Click,
          subject: DeprecatedSchema.Subject.BNMOReadFAQ,
          type: "button",
          flow: orderType === "OFFER" ? "make offer" : "buy now",
        }

        trackEvent(payload)
      },
      clickedBuyerProtection: () => {
        const payload: ClickedBuyerProtection = {
          action: ActionType.clickedBuyerProtection,
          context_module: ContextModule.ordersDetail,
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
