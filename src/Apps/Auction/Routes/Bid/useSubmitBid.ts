import { Router } from "found"
import { useRef } from "react"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import { useBidderPosition } from "Apps/Auction/Queries/useBidderPosition"
import { useCreateBidderPosition } from "Apps/Auction/Queries/useCreateBidderPosition"
import { useCreateTokenAndSubmit } from "Apps/Auction/Hooks/useCreateTokenAndSubmit"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { AuctionBidRoute_sale$data } from "__generated__/AuctionBidRoute_sale.graphql"
import { AuctionBidRoute_artwork$data } from "__generated__/AuctionBidRoute_artwork.graphql"
import { AuctionBidRoute_me$data } from "__generated__/AuctionBidRoute_me.graphql"
import { RelayRefetchProp } from "react-relay"
import { useToasts } from "@artsy/palette"
import {
  AuctionFormHelpers,
  AuctionFormValues,
} from "Apps/Auction/Components/Form/Utils/initialValues"
import {
  BiddingStatus,
  errorMessageForBidding,
} from "Apps/Auction/Components/Form/Utils/errorMessages"

const logger = createLogger("useSubmitBid")

export interface UseSubmitBidProps {
  artwork: AuctionBidRoute_artwork$data
  bidderID: string
  me: AuctionBidRoute_me$data
  relay: RelayRefetchProp
  requiresPaymentInformation: boolean
  sale: AuctionBidRoute_sale$data
}

export const useSubmitBid = ({
  artwork,
  bidderID,
  me,
  relay,
  requiresPaymentInformation,
  sale,
}: UseSubmitBidProps) => {
  const isRegistrationTracked = useRef(false)
  const { match, router } = useRouter()
  const { tracking } = useAuctionTracking()
  const { submitMutation: createBidderPosition } = useCreateBidderPosition()
  const { fetchBidderPosition } = useBidderPosition()
  const { createToken } = useCreateTokenAndSubmit({ me, sale })
  const { sendToast } = useToasts()

  // Look for /sale/id/bid/artwork-id?redirectTo=... and redirect to that URL
  // on a successful submission.
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
      fetchBidderPosition,
      helpers,
      redirectTo,
      relay,
      router,
      sale,
      sendToast,
      tracking,
    })

    if (requiresPaymentInformation) {
      try {
        await createToken(values, helpers)
      } catch (error) {
        helpers.setStatus("SUBMISSION_FAILED")
        logger.error("Error creating token", error)
        throw error
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
      helpers.setStatus("SUBMISSION_FAILED")
      logger.error("Error creating bidder position", error)
      throw error
    }

    const result = bidderPositionResponse?.createBidderPosition?.result!

    tracking.maybeTrackNewBidder({
      bidderID,
      me,
      isRegistrationTracked,
      result,
      sale,
    })

    try {
      await checkBidStatus(result)
    } catch (error) {
      helpers.setStatus("SUBMISSION_FAILED")
      logger.error("Error checking bid status", error)
    }
  }

  return {
    submitBid,
  }
}

const setupCheckBidStatus = (props: {
  artwork: AuctionBidRoute_artwork$data
  bidderID: string
  fetchBidderPosition: ReturnType<
    typeof useBidderPosition
  >["fetchBidderPosition"]
  helpers: AuctionFormHelpers
  redirectTo: string
  relay: RelayRefetchProp
  router: Router
  sale: AuctionBidRoute_sale$data
  sendToast: ReturnType<typeof useToasts>["sendToast"]
  tracking: ReturnType<typeof useAuctionTracking>["tracking"]
}) => {
  const {
    artwork,
    bidderID,
    fetchBidderPosition,
    helpers,
    redirectTo,
    // TODO: Enable when we refresh bids
    // relay,
    router,
    sale,
    sendToast,
    tracking,
  } = props

  const MAX_PENDING_POLL_ATTEMPTS = 10
  let pendingPollCount = 0

  const checkBidStatus = async result => {
    const bidderPositionID = result.position?.internalID

    // Get the bidder position and then check bid status. Loop if PENDING=true
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
        helpers.setStatus("SUBMISSION_FAILED")
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
        } else {
          helpers.setStatus(
            "Error fetching bid status. PENDING status timeout."
          )
          helpers.setSubmitting(false)
        }
        break
      }

      case "WINNING": {
        tracking.confirmBid({ bidderID, positionID: bidderPositionID })

        setTimeout(() => {
          sendToast({
            variant: "success",
            message: "Bid successfully placed.",
          })
          // Time is arbitrary, but we need to wait for the page to finish
          // transitioning to artwork/id
        }, 1000)

        router.push(redirectTo ?? `/artwork/${artwork.slug}`)
        break
      }

      case "OUTBID": {
        helpers.setFieldError(
          "selectedBid",
          errorMessageForBidding(result.status)
        )
        helpers.setSubmitting(false)

        break
      }

      case "RESERVE_NOT_MET": {
        helpers.setFieldError(
          "selectedBid",
          errorMessageForBidding(result.status)
        )
        helpers.setSubmitting(false)

        /**
         * TODO: In the future, we can fire this function to refresh the bid
         * increments automatically so the user doesn't have to reclick the
         * dropdown again.
         *
         * Even though this works, commented out because we will need to refine
         * the language with design, as its not entirely clear that the UI has
         * updated with the latest increments at a glance, and it could confuse
         * the user. We might need to update the message in `ErrorStatus.tsx`.
         */
        /*
        relay.refetch(
          {
            artworkID: artwork.slug,
            saleID: sale.slug,
          },
          {},
          // On complete, display a status notitifying the user that they didn't
          // meet the reserve
          _error => {
            helpers.setFieldTouched("selectedBid", true)
            helpers.setStatus("RESERVE_NOT_MET")
          }
        )
        */
        break
      }

      case "BIDDER_NOT_QUALIFIED": {
        router.push(`/auction/${sale.slug}/confirm-registration`)
        break
      }

      case "ERROR": {
        logger.error("Error placing bid:", result)

        if (result.messageHeader === "Bid not placed") {
          router.push(`/auction/${sale.slug}/confirm-registration`)
        } else {
          helpers.setStatus("SUBMISSION_FAILED")
          helpers.setSubmitting(false)
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
