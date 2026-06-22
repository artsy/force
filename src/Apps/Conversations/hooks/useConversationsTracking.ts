import {
  ActionType,
  OwnerType,
  type PartnerOfferInConversationViewed,
} from "@artsy/cohesion"
import { useCallback } from "react"
import { useTracking } from "react-tracking"

export const useConversationsTracking = () => {
  const { trackEvent } = useTracking()

  const trackPartnerOfferCTAViewed = useCallback(
    (conversationID: string) => {
      const payload: PartnerOfferInConversationViewed = {
        action: ActionType.partnerOfferInConversationViewed,
        context_owner_id: conversationID,
        context_owner_type: OwnerType.conversation,
      }

      trackEvent(payload)
    },
    [trackEvent],
  )

  return { trackPartnerOfferCTAViewed }
}
