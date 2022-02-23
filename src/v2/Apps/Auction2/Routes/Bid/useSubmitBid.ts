import { Router } from "found"
import { useRef } from "react"
import { useRouter } from "v2/System/Router/useRouter"
import createLogger from "v2/Utils/logger"
import { useBidderPosition } from "v2/Apps/Auction2/Queries/useBidderPosition"
import { useCreateBidderPosition } from "v2/Apps/Auction2/Queries/useCreateBidderPosition"
import {
  AuctionFormHelpers,
  AuctionFormValues,
  BiddingStatus,
  errorMessageForBidding,
} from "v2/Apps/Auction2/Components/Form/Utils"
import { useCreateTokenAndSubmit } from "v2/Apps/Auction2/Hooks/useCreateTokenAndSubmit"
import { useAuctionTracking } from "v2/Apps/Auction2/Hooks/useAuctionTracking"
import { Auction2BidRoute_sale } from "v2/__generated__/Auction2BidRoute_sale.graphql"
import { Auction2BidRoute_artwork } from "v2/__generated__/Auction2BidRoute_artwork.graphql"

const logger = createLogger("useSubmitBid")

export const useSubmitBid = ({
  artwork,
  bidderID,
  me,
  requiresPaymentInformation,
  sale,
}) => {
  // FIXME
  const registrationTracked = useRef(false)
  const { router } = useRouter()
  const { tracking } = useAuctionTracking()
  const { submitMutation: createBidderPosition } = useCreateBidderPosition()
  const { fetchBidderPosition } = useBidderPosition()
  const { createToken } = useCreateTokenAndSubmit({ me, sale })

  /**
   * The submitBid flow is as follows:
   *
   *  1. If no CC, create a new token
   *  2. Create a bidder position
   *  3. Check bidder position status
   *  4. If PENDING, continue polling (can be removed with new Bidding engine)
   */
  const submitBid = async (
    values: AuctionFormValues,
    helpers: AuctionFormHelpers
  ) => {
    const { checkBidStatus } = setupCheckBidStatus({
      helpers,
      tracking,
      fetchBidderPosition,
      bidderID,
      router,
      sale,
      artwork,
    })

    if (requiresPaymentInformation) {
      try {
        await createToken(values, helpers)
      } catch (error) {
        logger.error("Error creating token", error)
      }
    }

    let bidderPositionResponse

    try {
      bidderPositionResponse = await createBidderPosition({
        variables: {
          input: {
            maxBidAmountCents: Number(values.selectedBid),
            artworkID: artwork.internalID,
            saleID: sale.internalID,
          },
        },
      })
    } catch (error) {
      logger.error("Error creating bidder position", error)
    }

    const result = bidderPositionResponse?.createBidderPosition?.result!

    tracking.maybeTrackNewBidder({
      bidderID,
      result,
      registrationTracked,
      sale,
      me,
    })

    try {
      await checkBidStatus(result)
    } catch (error) {
      logger.error("Error checking bid status", error)
    }
  }

  return {
    submitBid,
  }
}

const setupCheckBidStatus = (props: {
  artwork: Auction2BidRoute_artwork
  bidderID: string
  fetchBidderPosition: ReturnType<
    typeof useBidderPosition
  >["fetchBidderPosition"]
  helpers: AuctionFormHelpers
  router: Router
  sale: Auction2BidRoute_sale
  tracking: ReturnType<typeof useAuctionTracking>["tracking"]
}) => {
  const {
    artwork,
    bidderID,
    fetchBidderPosition,
    helpers,
    router,
    sale,
    tracking,
  } = props

  const MAX_PENDING_POLL_ATTEMPTS = 20
  let pendingPollCount = 0

  const checkBidStatus = async result => {
    const bidderPositionID = result.position?.internalID

    const getBidderPosition = async () => {
      try {
        const response = await fetchBidderPosition({
          variables: {
            bidderPositionID,
          },
        })

        // Loop
        return checkBidStatus(response?.me?.bidderPosition)
      } catch (error) {
        logger.error("Error fetching bidder position", error)
      }
    }

    const status: BiddingStatus = result.status

    switch (status) {
      case "SUCCESS": {
        await getBidderPosition()
        break
      }

      case "PENDING": {
        if (pendingPollCount < MAX_PENDING_POLL_ATTEMPTS) {
          setTimeout(async () => {
            await getBidderPosition()
          }, 1000)

          pendingPollCount++
        }
        break
      }

      case "WINNING": {
        tracking.confirmBidSuccess(bidderID, bidderPositionID)
        router.push(`/artwork/${artwork.slug}`)
        break
      }

      case "OUTBID" || "RESERVE_NOT_MET": {
        helpers.setFieldError(
          "selectedBid",
          errorMessageForBidding(result.status)
        )
        helpers.setSubmitting(false)
        break
      }

      case "BIDDER_NOT_QUALIFIED": {
        router.push(`/auction2/${sale.slug}/confirm-registration`)
        break
      }

      // TODO: Look at this
      case "ERROR": {
        console.error("[useSubmitBid]", result)

        if (result.messageHeader === "Bid not placed") {
          router.push(`/auction2/${sale.slug}/confirm-registration`)
        }
        break
      }

      default: {
        helpers.setStatus(result.status)
        helpers.setSubmitting(false)
      }
    }
  }

  return {
    checkBidStatus,
  }
}
