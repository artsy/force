import { useTracking } from "react-tracking"
import { AnalyticsSchema, useAnalyticsContext } from "v2/System"
import { formatError } from "v2/Apps/Auction2/Components/Form/Utils"
import { AddToCalendar, addToCalendar, ContextModule } from "@artsy/cohesion"

/**
 * Tracking TODO:
 * - contextModule name for buy now rail artwork
 *
 */

export const useAuctionTracking = () => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const tracking = {
    addToCalendar: (subject: AddToCalendar["subject"]) => {
      trackEvent(
        addToCalendar({
          context_module: ContextModule.auctionHome,
          context_owner_id: contextPageOwnerId,
          context_owner_slug: contextPageOwnerSlug,
          context_owner_type: contextPageOwnerType!,
          subject,
        })
      )
    },
    bidPageView: ({ artwork, me }) => {
      trackEvent({
        artwork_slug: artwork?.slug,
        auction_slug: artwork?.saleArtwork?.sale?.slug,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: artwork?.saleArtwork?.sale?.internalID,
        user_id: me.internalID,
      })
    },
    clickedActiveBid: ({ artworkID, saleID, userID }) => {
      trackEvent({
        artwork_slug: artworkID, //FIXME: c
        auction_slug: saleID,
        context_type: "your active bids",
        user_id: userID,
      })
    },
    clickedRegisterButton: ({ auctionSlug, auctionState, userID }) => {
      trackEvent({
        auction_slug: auctionSlug,
        auction_state: auctionState,
        context_type: "auctions landing",
        description: 'Clicked "Register to bid"',
        user_id: userID,
      })
    },
    clickedVerifyIdentity: ({ auctionSlug, auctionState, userID }) => {
      trackEvent({
        auction_slug: auctionSlug,
        auction_state: auctionState,
        context_type: "auctions landing",
        description: 'Clicked "Verify identity"',
        user_id: userID,
      })
    },
    confirmBidSuccess: ({ bidderID, positionID }) => {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.ConfirmBidSubmitted,
        bidder_id: bidderID,
        bidder_position_id: positionID,
      })
    },
    confirmBidFailed: (errors: string[], bidderID: string) => {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        bidder_id: bidderID,
        error_messages: errors,
      })
    },
    confirmRegistrationPageView: () => {
      trackEvent({
        context_page: AnalyticsSchema.PageName.AuctionRegistrationPage,
      })
    },
    enterLiveAuction: liveAuctionURL => {
      trackEvent({
        context_module: "auction banner",
        destination_path: liveAuctionURL,
        flow: "auctions",
        label: "enter live auction",
        type: "button",
      })
    },
    maxBidSelected: (bidderID: string, maxBid: string) => {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.SelectedMaxBid,
        bidder_id: bidderID,
        selected_max_bid_minor: maxBid,
      })
    },
    maybeTrackNewBidder: ({
      bidderID,
      me,
      result,
      registrationTracked,
      sale,
    }) => {
      const trackNewBidderRegistration = !(
        bidderID && registrationTracked.current
      )

      // FIXME: registrationTracked.current is never set to true
      if (trackNewBidderRegistration) {
        const newBidderID =
          result?.position?.saleArtwork?.sale?.registrationStatus?.internalID

        tracking.registrationSubmitted({
          bidderID: newBidderID,
          me,
          sale,
        })

        registrationTracked.current = true
      }
    },
    registrationPageView: () => {
      trackEvent({
        context_page: AnalyticsSchema.PageName.AuctionRegistrationPage,
      })
    },

    registrationSubmitted: ({ bidderID, me, sale }) => {
      // console.log(sale, me)

      trackEvent({
        action_type: AnalyticsSchema.ActionType.RegistrationSubmitted,
        auction_slug: sale.slug,
        auction_state: sale.status,
        bidder_id: bidderID, // response.createBidder?.bidder?.internalID,
        sale_id: sale.internalID,
        user_id: me.internalID,
      })
    },
    registrationSubmitFailed: ({ error, sale, me }) => {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.RegistrationSubmitFailed,
        auction_slug: sale.slug,
        auction_state: sale.status,
        error_messages: formatError(error),
        sale_id: sale.internalID,
        user_id: me.internalID,
      })
    },
  }

  return { tracking }
}
