import { Router } from "found"
import { MutableRefObject, useRef } from "react"
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
import { Auction2BidRoute_me } from "v2/__generated__/Auction2BidRoute_me.graphql"

const logger = createLogger("useSubmitBid")

interface UseSubmitBidProps {
  artwork: Auction2BidRoute_artwork
  bidderID: string
  checkBidStatusPollingInterval: MutableRefObject<NodeJS.Timeout | null>
  me: Auction2BidRoute_me
  requiresPaymentInformation: boolean
  sale: Auction2BidRoute_sale
}

export const useSubmitBid = ({
  artwork,
  bidderID,
  checkBidStatusPollingInterval,
  me,
  requiresPaymentInformation,
  sale,
}: UseSubmitBidProps) => {
  // FIXME
  const registrationTracked = useRef(false)
  const { match, router } = useRouter()
  const { tracking } = useAuctionTracking()
  const { submitMutation: createBidderPosition } = useCreateBidderPosition()
  const { fetchBidderPosition } = useBidderPosition()
  const { createToken } = useCreateTokenAndSubmit({ me, sale })
  const { redirectTo } = match.location.query

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
    helpers.setStatus(null)

    const { checkBidStatus } = setupCheckBidStatus({
      artwork,
      bidderID,
      checkBidStatusPollingInterval,
      fetchBidderPosition,
      helpers,
      redirectTo,
      router,
      sale,
      tracking,
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
  checkBidStatusPollingInterval: MutableRefObject<NodeJS.Timeout | null>
  fetchBidderPosition: ReturnType<
    typeof useBidderPosition
  >["fetchBidderPosition"]
  helpers: AuctionFormHelpers
  redirectTo: string
  router: Router
  sale: Auction2BidRoute_sale
  tracking: ReturnType<typeof useAuctionTracking>["tracking"]
}) => {
  const {
    artwork,
    bidderID,
    checkBidStatusPollingInterval,
    fetchBidderPosition,
    helpers,
    redirectTo,
    router,
    sale,
    tracking,
  } = props

  const MAX_PENDING_POLL_ATTEMPTS = 10
  let pendingPollCount = 0

  const checkBidStatus = async result => {
    const bidderPositionID = result.position?.internalID

    const getBidderPosition = async () => {
      try {
        helpers.setSubmitting(true)

        const response = await fetchBidderPosition({
          variables: {
            bidderPositionID,
          },
        })

        // Loop
        return checkBidStatus(response?.me?.bidderPosition)
      } catch (error) {
        helpers.setSubmitting(false)

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
          checkBidStatusPollingInterval.current = setTimeout(async () => {
            await getBidderPosition()
          }, 1000)

          pendingPollCount++
        } else {
          checkBidStatusPollingInterval.current = null

          helpers.setStatus(
            "Error fetching bid status. PENDING status timeout."
          )
          helpers.setSubmitting(false)
        }
        break
      }

      case "WINNING": {
        tracking.confirmBidSuccess(bidderID, bidderPositionID)
        router.push(redirectTo ?? `/artwork/${artwork.slug}`)
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
