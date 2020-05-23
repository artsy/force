import { Box, Separator, Serif } from "@artsy/palette"
import { Location, Match } from "found"

import { BidderPositionQueryResponse } from "v2/__generated__/BidderPositionQuery.graphql"
import { ConfirmBid_me } from "v2/__generated__/ConfirmBid_me.graphql"
import {
  ConfirmBidCreateBidderPositionMutation,
  ConfirmBidCreateBidderPositionMutationResponse,
} from "v2/__generated__/ConfirmBidCreateBidderPositionMutation.graphql"
import { routes_ConfirmBidQueryResponse } from "v2/__generated__/routes_ConfirmBidQuery.graphql"
import {
  BidFormFragmentContainer as BidForm,
  determineDisplayRequirements,
  FormValues,
} from "v2/Apps/Auction/Components/BidForm"
import { LotInfoFragmentContainer as LotInfo } from "v2/Apps/Auction/Components/LotInfo"
import { bidderPositionQuery } from "v2/Apps/Auction/Routes/ConfirmBid/BidderPositionQuery"
import { createCreditCardAndUpdatePhone } from "v2/Apps/Auction/Routes/Register"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { track } from "v2/Artsy"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { FormikHelpers as FormikActions } from "formik"
import { isEmpty } from "lodash"
import React, { useEffect, useState } from "react"
import { Title } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import {
  Elements,
  injectStripe,
  ReactStripeElements,
  StripeProvider,
} from "react-stripe-elements"
import { data as sd } from "sharify"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"

const logger = createLogger("Apps/Auction/Routes/ConfirmBid")

type BidFormActions = FormikActions<FormValues>

interface OptionalQueryStrings {
  bid?: string
}

interface ConfirmBidProps extends ReactStripeElements.InjectedStripeProps {
  artwork: routes_ConfirmBidQueryResponse["artwork"]
  me: ConfirmBid_me
  relay: RelayProp
  match: Match
}

const MAX_POLL_ATTEMPTS = 20

export const ConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  let pollCount = 0
  let registrationTracked = false

  const { artwork, me, relay, stripe } = props
  const { saleArtwork } = artwork
  const { sale } = saleArtwork
  const { environment } = relay
  const { trackEvent } = useTracking()
  const { requiresPaymentInformation } = determineDisplayRequirements(
    (sale as any).registrationStatus,
    me as any
  )

  let bidderId: string | null =
    sale.registrationStatus && sale.registrationStatus.internalID

  function createBidderPosition(maxBidAmountCents: number) {
    return new Promise<ConfirmBidCreateBidderPositionMutationResponse>(
      (resolve, reject) => {
        commitMutation<ConfirmBidCreateBidderPositionMutation>(environment, {
          onCompleted: data => resolve(data),
          onError: error => reject(error),
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
          variables: {
            input: {
              saleID: sale.internalID,
              artworkID: artwork.internalID,
              maxBidAmountCents,
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
    actions.setStatus(
      "Something went wrong while processing your bid. Please make sure your internet connection is active and try again"
    )
  }

  function trackConfirmBidFailed(errors: string[]) {
    trackEvent({
      action_type: Schema.ActionType.ConfirmBidFailed,
      bidder_id: bidderId,
      error_messages: errors,
    })
  }

  function trackConfirmBidSuccess(
    positionId: string,
    selectedBidAmountCents: number
  ) {
    trackEvent({
      action_type: Schema.ActionType.ConfirmBidSubmitted,
      bidder_position_id: positionId,
      bidder_id: bidderId,
      order_id: bidderId,
      products: [
        {
          product_id: artwork.internalID,
          quantity: 1,
          price: selectedBidAmountCents / 100,
        },
      ],
    })
  }

  function trackMaxBidSelected(maxBid: string) {
    trackEvent({
      action_type: Schema.ActionType.SelectedMaxBid,
      bidder_id: bidderId,
      order_id: bidderId,
      selected_max_bid_minor: maxBid,
    })
  }

  const createTokenFromAddress = async (address: stripe.TokenOptions) => {
    const { error, token } = await stripe.createToken(address)

    if (error) {
      throw new Error(`Stripe error: ${error.message || error.decline_code}`)
    } else {
      return token
    }
  }

  async function handleSubmit(values: FormValues, actions: BidFormActions) {
    const selectedBid = Number(values.selectedBid)

    if (requiresPaymentInformation) {
      try {
        const { address } = values
        const stripeAddress = {
          name: address.name,
          address_line1: address.addressLine1,
          address_line2: address.addressLine2,
          address_country: address.country,
          address_city: address.city,
          address_state: address.region,
          address_zip: address.postalCode,
        }

        const token = await createTokenFromAddress(stripeAddress)
        await createCreditCardAndUpdatePhone(
          environment,
          address.phoneNumber,
          token.id
        )
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
    const { result } = data.createBidderPosition
    const { position, messageHeader } = result

    if (!bidderId && !registrationTracked) {
      const newBidderId =
        position &&
        position.saleArtwork &&
        position.saleArtwork.sale &&
        position.saleArtwork.sale.registrationStatus.internalID

      trackEvent({
        action_type: Schema.ActionType.RegistrationSubmitted,
        bidder_id: newBidderId,
      })
      registrationTracked = true
    }

    bidderId =
      bidderId ||
      (position &&
        position.saleArtwork &&
        position.saleArtwork.sale &&
        position.saleArtwork.sale.registrationStatus.internalID)

    if (result.status === "SUCCESS") {
      bidderPositionQuery(environment, {
        bidderPositionID: position.internalID,
      })
        .then(res => checkBidderPosition({ actions, data: res, selectedBid }))
        .catch(error => onJsError(actions, error))
    } else {
      actions.setStatus(messageHeader)
      actions.setSubmitting(false)
      trackConfirmBidFailed([messageHeader])
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
    const { bidderPosition } = data.me
    const { status, position, messageHeader } = bidderPosition

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
      trackConfirmBidSuccess(position.internalID, selectedBid)
      const href = `/artwork/${artwork.slug}`
      window.location.assign(href)
    } else {
      actions.setStatus(messageHeader)
      actions.setSubmitting(false)
      trackConfirmBidFailed([messageHeader])
    }
  }

  return (
    <AppContainer>
      <Title>Confirm Bid | Artsy</Title>

      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="8">Confirm your bid</Serif>

        <Separator />

        <LotInfo artwork={artwork} saleArtwork={artwork.saleArtwork} />

        <Separator />

        <BidForm
          artworkSlug={artwork.slug}
          initialSelectedBid={getInitialSelectedBid(props.match.location)}
          saleArtwork={saleArtwork}
          onSubmit={handleSubmit}
          onMaxBidSelect={trackMaxBidSelected}
          me={me as any}
          trackSubmissionErrors={errors =>
            !isEmpty(errors) && trackConfirmBidFailed(errors)
          }
        />
      </Box>
    </AppContainer>
  )
}

const getInitialSelectedBid = (location: Location): string | undefined => {
  return get(
    location,
    ({ query }) => (query as OptionalQueryStrings).bid,
    undefined
  )
}

const StripeInjectedConfirmBidRoute = injectStripe(ConfirmBidRoute)

export const StripeWrappedConfirmBidRoute: React.FC<ConfirmBidProps> = props => {
  const [stripe, setStripe] = useState(null)

  function setupStripe() {
    setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
  }

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
    } else {
      document.querySelector("#stripe-js").addEventListener("load", setupStripe)

      return () => {
        document
          .querySelector("#stripe-js")
          .removeEventListener("load", setupStripe)
      }
    }
  }, [])

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeInjectedConfirmBidRoute {...props} />
      </Elements>
    </StripeProvider>
  )
}

const TrackingWrappedConfirmBidRoute = track<ConfirmBidProps>(props => ({
  context_page: Schema.PageName.AuctionConfirmBidPage,
  auction_slug: props.artwork.saleArtwork.sale.slug,
  artwork_slug: props.artwork.slug,
  sale_id: props.artwork.saleArtwork.sale.internalID,
  user_id: props.me.internalID,
}))(StripeWrappedConfirmBidRoute)

export const ConfirmBidRouteFragmentContainer = createFragmentContainer(
  TrackingWrappedConfirmBidRoute,
  {
    me: graphql`
      fragment ConfirmBid_me on Me {
        internalID
        hasQualifiedCreditCards
        ...BidForm_me
      }
    `,
  }
)

// For bundle splitting in router
export default ConfirmBidRouteFragmentContainer
