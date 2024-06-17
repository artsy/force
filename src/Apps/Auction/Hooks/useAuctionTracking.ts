import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  ActionType,
  AddToCalendar,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

/**
 * Tracking TODO:
 * - contextModule name for buy now rail artwork
 */

export const useAuctionTracking = () => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const tracking = {
    addToCalendar: ({ subject }: { subject: AddToCalendar["subject"] }) => {
      const trackingProperties: AddToCalendar = {
        action: ActionType.addToCalendar,
        context_module: ContextModule.auctionHome,
        context_owner_id: contextPageOwnerId,
        context_owner_slug: contextPageOwnerSlug,
        context_owner_type: contextPageOwnerType!,
        subject,
      }
      trackEvent(trackingProperties)
    },
    auctionPageView: ({ me, sale }) => {
      trackEvent({
        action: ActionType.auctionPageView,
        auction_slug: sale.slug,
        sale_id: sale.internalID,
        user_id: me?.internalID,
      })
    },
    bidPageView: ({ artwork, me }) => {
      trackEvent({
        action: ActionType.bidPageView,
        artwork_slug: artwork?.slug,
        auction_slug: artwork?.saleArtwork?.sale?.slug,
        context_page: ContextModule.auctionHome,
        sale_id: artwork?.saleArtwork?.sale?.internalID,
        user_id: me.internalID,
      })
    },
    clickedActiveBid: ({ artworkSlug, saleSlug, userID }) => {
      trackEvent({
        action: ActionType.clickedActiveBid,
        artwork_slug: artworkSlug,
        auction_slug: saleSlug,
        user_id: userID,
      })
    },
    clickedRegisterButton: () => {
      trackEvent({
        action: ActionType.clickedRegisterToBid,
        context_module: ContextModule.auctionHome,
        context_owner_id: contextPageOwnerId,
        context_owner_slug: contextPageOwnerSlug,
        context_owner_type: OwnerType.auction,
      })
    },
    clickedVerifyIdentity: ({ auctionSlug, auctionState, userID }) => {
      trackEvent({
        action: ActionType.clickedVerifyIdentity,
        auction_slug: auctionSlug,
        auction_state: auctionState,
        context_type: ContextModule.auctionHome,
        description: 'Clicked "Verify identity"',
        user_id: userID,
      })
    },
    confirmBid: ({ bidderID, positionID }) => {
      trackEvent({
        action: ActionType.confirmBid,
        bidder_id: bidderID,
        bidder_position_id: positionID,
      })
    },
    confirmRegistrationPageView: () => {
      trackEvent({
        action: ActionType.confirmRegistrationPageview,
        context_page: ContextModule.auctionHome,
      })
    },
    enterLiveAuction: ({ url }) => {
      trackEvent({
        action: ActionType.enterLiveAuction,
        context_module: ContextModule.auctionHome,
        destination_path: url,
        subject: "Enter live auction",
      })
    },
    maxBidSelected: ({ bidderID, maxBid }) => {
      trackEvent({
        action: ActionType.maxBidSelected,
        bidder_id: bidderID,
        selected_max_bid_minor: maxBid,
      })
    },
    maybeTrackNewBidder: ({
      bidderID,
      me,
      result,
      isRegistrationTracked,
      sale,
    }) => {
      const trackNewBidderRegistration =
        !bidderID && isRegistrationTracked.current === false

      if (trackNewBidderRegistration) {
        const newBidderID =
          result?.position?.saleArtwork?.sale?.registrationStatus?.internalID

        tracking.registrationSubmitted({
          bidderID: newBidderID,
          me,
          sale,
        })

        isRegistrationTracked.current = true
      }
    },
    registrationPageView: () => {
      trackEvent({
        action: ActionType.registrationPageView,
        context_module: ContextModule.auctionHome,
      })
    },

    registrationSubmitted: ({ bidderID, me, sale }) => {
      trackEvent({
        action: ActionType.registrationSubmitted,
        auction_slug: sale.slug,
        auction_state: sale.status,
        bidder_id: bidderID,
        sale_id: sale.internalID,
        user_id: me.internalID,
      })
    },
  }

  return { tracking }
}
