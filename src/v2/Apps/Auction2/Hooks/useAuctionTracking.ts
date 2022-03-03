import { useTracking } from "react-tracking"
import { AnalyticsSchema } from "v2/System"
import { formatError } from "v2/Apps/Auction2/Components/Form/Utils"

/**
 * Tracking TODO:
 * - contextModule name for buy now rail artwork
 *
 */

export const useAuctionTracking = () => {
  const { trackEvent } = useTracking()

  const tracking = {
    bidPageView: ({ artwork, me }) => {
      trackEvent({
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        artwork_slug: artwork?.slug,
        auction_slug: artwork?.saleArtwork?.sale?.slug,
        sale_id: artwork?.saleArtwork?.sale?.internalID,
        user_id: me.internalID,
      })
    },
    confirmBidSuccess: (bidderID: string, positionID: string) => {
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
    registerButtonClick: () => {
      // TODO
    },
    registrationSubmitted: ({ bidderID, me, sale }) => {
      console.log(sale, me)

      trackEvent({
        action_type: AnalyticsSchema.ActionType.RegistrationSubmitted,
        bidder_id: bidderID, // response.createBidder?.bidder?.internalID,
        auction_slug: sale.slug,
        auction_state: sale.status,
        sale_id: sale.internalID,
        user_id: me.internalID,
      })
    },
    registrationSubmitFailed: ({ error, sale, me }) => {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.RegistrationSubmitFailed,
        error_messages: formatError(error),
        auction_slug: sale.slug,
        auction_state: sale.status,
        sale_id: sale.internalID,
        user_id: me.internalID,
      })
    },
  }

  return { tracking }
}
