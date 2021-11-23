import { Box, Separator, Serif } from "@artsy/palette"
import { Match } from "found"

import { BidderPositionQueryResponse } from "v2/__generated__/BidderPositionQuery.graphql"
import { ConfirmBid_me } from "v2/__generated__/ConfirmBid_me.graphql"
import {
  ConfirmBidCreateBidderPositionMutation,
  ConfirmBidCreateBidderPositionMutationResponse,
} from "v2/__generated__/ConfirmBidCreateBidderPositionMutation.graphql"
import { auctionRoutes_ConfirmBidQueryResponse } from "v2/__generated__/auctionRoutes_ConfirmBidQuery.graphql"
import { BidFormFragmentContainer as BidForm } from "v2/Apps/Auction/Components/BidForm"
import { LotInfoFragmentContainer as LotInfo } from "v2/Apps/Auction/Components/LotInfo"
import { bidderPositionQuery } from "v2/Apps/Auction/Operations/BidderPositionQuery"
import { createCreditCardAndUpdatePhone } from "v2/Apps/Auction/Operations/CreateCreditCardAndUpdatePhone"
import { track } from "v2/System"
import * as Schema from "v2/System/Analytics/Schema"
import { useTracking } from "v2/System/Analytics/useTracking"
import { FormikHelpers as FormikActions } from "formik"
import { isEmpty } from "lodash"
import * as React from "react"
import { Title } from "react-head"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { CardElement } from "@stripe/react-stripe-js"
import createLogger from "v2/Utils/logger"
import {
  FormValuesForBidding,
  determineDisplayRequirements,
  errorMessageForBidding,
  errorMessageForCard,
  saleConfirmRegistrationPath,
  toStripeAddress,
} from "v2/Apps/Auction/Components/Form"
import { createStripeWrapper } from "v2/Utils/createStripeWrapper"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"
import { data as sd } from "sharify"

const logger = createLogger("Apps/Auction/Routes/ConfirmBid")

type BidFormActions = FormikActions<FormValuesForBidding>
// TODO: Replace with a GraphQL type
interface BidderPosition {
  status: string
  messageHeader: string
}

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

interface ConfirmBidProps {
  artwork: auctionRoutes_ConfirmBidQueryResponse["artwork"]
  me: ConfirmBid_me
  relay: RelayProp
  match: Match
}

const MAX_POLL_ATTEMPTS = 20

export const ConfirmBidRoute: React.FC<
  ConfirmBidProps & StripeProps
> = props => {
  let pollCount = 0
  let registrationTracked = false

  const { artwork, me, relay, stripe, elements } = props
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const { saleArtwork } = artwork
  const { sale } = saleArtwork
  const { environment } = relay
  const { trackEvent } = useTracking()
  const { requiresPaymentInformation } = determineDisplayRequirements(
    sale.registrationStatus,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    me
  )

  let bidderId = sale.registrationStatus?.internalID

  function createBidderPosition(maxBidAmountCents: number) {
    return new Promise<ConfirmBidCreateBidderPositionMutationResponse>(
      (resolve, reject) => {
        commitMutation<ConfirmBidCreateBidderPositionMutation>(environment, {
          mutation: graphql`
            mutation ConfirmBidCreateBidderPositionMutation(
              $input: BidderPositionInput!
            ) {
              createBidderPosition(input: $input) {
                result {
                  position {
                    internalID
                    saleArtwork {
                      sale {
                        registrationStatus {
                          internalID
                          qualifiedForBidding
                        }
                      }
                    }
                  }
                  status
                  messageHeader
                }
              }
            }
          `,
          onCompleted: resolve,
          onError: reject,
          variables: {
            input: {
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              artworkID: artwork.internalID,
              maxBidAmountCents,
              saleID: sale.internalID,
            },
          },
        })
      }
    )
  }

  function onJsError(actions: BidFormActions, error: Error) {
    logger.error(error)
    trackConfirmBidFailed([`JavaScript error: ${error.message}`])
    actions.setSubmitting(false)
    actions.setStatus("ERROR")
  }

  function handleMutationError(
    helpers: BidFormActions,
    bidderPosition: BidderPosition
  ) {
    const { status, messageHeader } = bidderPosition

    trackConfirmBidFailed([messageHeader])

    if (status === "OUTBID" || status === "RESERVE_NOT_MET") {
      helpers.setFieldError("selectedBid", errorMessageForBidding(status))
      helpers.setSubmitting(false)
    } else if (
      status === "BIDDER_NOT_QUALIFIED" ||
      (status === "ERROR" && messageHeader === "Bid not placed")
    ) {
      // The found router does not seem to work with a non-found route.
      window.location.assign(saleConfirmRegistrationPath(sale.slug))
    } else {
      helpers.setStatus(status)
      helpers.setSubmitting(false)
    }
  }

  function trackConfirmBidFailed(errors: string[]) {
    trackEvent({
      action_type: Schema.ActionType.ConfirmBidFailed,
      bidder_id: bidderId,
      error_messages: errors,
    })
  }

  function trackConfirmBidSuccess(positionId: string) {
    trackEvent({
      action_type: Schema.ActionType.ConfirmBidSubmitted,
      bidder_id: bidderId,
      bidder_position_id: positionId,
    })
  }

  function trackMaxBidSelected(maxBid: string) {
    trackEvent({
      action_type: Schema.ActionType.SelectedMaxBid,
      bidder_id: bidderId,
      selected_max_bid_minor: maxBid,
    })
  }

  async function handleSubmit(
    values: FormValuesForBidding,
    actions: BidFormActions
  ) {
    // FIXME: workaround for Formik calling `setSubmitting(false)` when the
    //  `onSubmit` function does not block.
    setTimeout(() => actions.setSubmitting(true), 0)

    const selectedBid = Number(values.selectedBid)

    if (requiresPaymentInformation) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const stripeAddress = toStripeAddress(values.address)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const { phoneNumber } = values.address
      const { setFieldError, setSubmitting } = actions

      try {
        const element = elements.getElement(CardElement)
        const { error, token } = await stripe.createToken(
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          element,
          stripeAddress
        )

        if (error) {
          setFieldError("creditCard", error.message)
          setSubmitting(false)
          return
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const { id } = token
        const {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          createCreditCard: { creditCardOrError },
        } = await createCreditCardAndUpdatePhone(environment, phoneNumber, id)

        // TODO: We are not handling errors for `updateMyUserProfile`. Should we?
        if (creditCardOrError.mutationError) {
          setFieldError(
            "creditCard",
            errorMessageForCard(creditCardOrError.mutationError.detail)
          )
          setSubmitting(false)
          return
        }
      } catch (error) {
        onJsError(actions, error)
        return
      }
    }

    createBidderPosition(selectedBid)
      .then(data => verifyBidderPosition({ actions, data, selectedBid }))
      .catch(error => onJsError(actions, error))
  }

  function verifyBidderPosition({
    actions,
    data,
    selectedBid,
  }: {
    actions: BidFormActions
    data: ConfirmBidCreateBidderPositionMutationResponse
    selectedBid: number
  }) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const { result } = data.createBidderPosition
    const { position } = result

    if (!bidderId && !registrationTracked) {
      const newBidderId =
        position?.saleArtwork?.sale?.registrationStatus?.internalID

      trackEvent({
        action_type: Schema.ActionType.RegistrationSubmitted,
        bidder_id: newBidderId,
      })
      registrationTracked = true
    }

    bidderId =
      bidderId || position?.saleArtwork?.sale?.registrationStatus?.internalID

    if (result.status === "SUCCESS") {
      bidderPositionQuery(environment, {
        bidderPositionID: position.internalID,
      })
        .then(res => checkBidderPosition({ actions, data: res, selectedBid }))
        .catch(error => onJsError(actions, error))
    } else {
      handleMutationError(actions, result)
    }
  }

  function checkBidderPosition({
    actions,
    data,
    selectedBid,
  }: {
    actions: BidFormActions
    data: BidderPositionQueryResponse
    selectedBid: number
  }) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const { bidderPosition } = data.me
    const { status, position } = bidderPosition

    if (status === "PENDING" && pollCount < MAX_POLL_ATTEMPTS) {
      // initiating new request here (vs setInterval) to make sure we wait for
      // the previous call to return before making a new one
      setTimeout(
        () =>
          bidderPositionQuery(environment, {
            bidderPositionID: position.internalID,
          })
            .then(res =>
              checkBidderPosition({ actions, data: res, selectedBid })
            )
            .catch(error => onJsError(actions, error)),
        1000
      )

      pollCount += 1
    } else if (status === "WINNING") {
      trackConfirmBidSuccess(position.internalID)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      window.location.assign(`/artwork/${artwork.slug}`)
    } else {
      handleMutationError(actions, bidderPosition)
    }
  }

  function renderZendeskScript() {
    if (typeof window !== "undefined" && window.zEmbed) return

    return <ZendeskWrapper zdKey={sd.AUCTION_ZENDESK_KEY} />
  }

  return (
    <>
      <Title>Confirm Bid | Artsy</Title>

      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="8">Confirm your bid</Serif>
        <Separator />
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <LotInfo artwork={artwork} saleArtwork={artwork.saleArtwork} />
        <Separator />
        <BidForm
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          artworkSlug={artwork.slug}
          initialSelectedBid={props.match?.location?.query?.bid}
          saleArtwork={saleArtwork}
          onSubmit={handleSubmit}
          onMaxBidSelect={trackMaxBidSelected}
          me={me as any}
          trackSubmissionErrors={errors =>
            !isEmpty(errors) && trackConfirmBidFailed(errors)
          }
        />
        {renderZendeskScript()}
      </Box>
    </>
  )
}

const StripeWrappedConfirmBidRoute = createStripeWrapper(ConfirmBidRoute)

const TrackingWrappedConfirmBidRoute = track<ConfirmBidProps>(props => ({
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  artwork_slug: props.artwork.slug,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  auction_slug: props.artwork.saleArtwork.sale.slug,
  context_page: Schema.PageName.AuctionConfirmBidPage,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  sale_id: props.artwork.saleArtwork.sale.internalID,
  user_id: props.me.internalID,
}))(StripeWrappedConfirmBidRoute)

export const ConfirmBidRouteFragmentContainer = createFragmentContainer<
  ConfirmBidProps
>(TrackingWrappedConfirmBidRoute, {
  me: graphql`
    fragment ConfirmBid_me on Me {
      internalID
      hasQualifiedCreditCards
      ...BidForm_me
    }
  `,
})
