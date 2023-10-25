import { FC, useState } from "react"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Button, Flex, Message, Spacer, Text } from "@artsy/palette"
import { Offer_order$data } from "__generated__/Offer_order.graphql"
import { OfferMutation } from "__generated__/OfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { PriceOptionsFragmentContainer } from "Apps/Order/Components/PriceOptions"
import { OfferNote } from "Apps/Order/Components/OfferNote"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { useTracking } from "react-tracking"
import { Router } from "found"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { offerFlowSteps } from "Apps/Order/Components/OrderStepper"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import {
  getOfferItemFromOrder,
  lastOfferNote,
} from "Apps/Order/Utils/offerUtils"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { isNil } from "lodash"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { useJump } from "Utils/Hooks/useJump"

const logger = createLogger("Order/Routes/Offer/index.tsx")

export const DEFUALT_OFFER_NOTE_PREFIX = "I sent an offer for"

export interface OfferRouteProps {
  order: Offer_order$data
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export const OfferRoute: FC<OfferRouteProps> = ({
  order,
  router,
  dialog,
  commitMutation,
  isCommittingMutation,
}) => {
  const { trackEvent } = useTracking()
  const [formIsDirty, setFormIsDirty] = useState(false)
  const [lowSpeedBumpEncountered, setLowSpeedBumpEncountered] = useState(false)
  const [offerNoteValue, setOfferNoteValue] = useState({
    exceedsCharacterLimit: false,
    value: lastOfferNote(order.myLastOffer?.note || ""),
  })
  const [offerValue, setOfferValue] = useState(0)
  const { jumpTo } = useJump()

  const onOfferInputFocus = () => {
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.FocusedOnOfferInput,
      flow: DeprecatedAnalyticsSchema.Flow.MakeOffer,
      order_id: order.internalID,
    })
  }

  const showLowSpeedbump = () => {
    setLowSpeedBumpEncountered(true)
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.ViewedOfferTooLow,
      flow: DeprecatedAnalyticsSchema.Flow.MakeOffer,
      order_id: order.internalID,
    })

    dialog.showErrorDialog({
      continueButtonText: "OK",
      message:
        "Offers within 20% of the list price are most likely to receive a response.",
      title: "Offer may be too low",
    })
  }

  const addInitialOfferToOrder = (variables: OfferMutation["variables"]) => {
    return commitMutation<OfferMutation>({
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation OfferMutation($input: CommerceAddInitialOfferToOrderInput!) {
          commerceAddInitialOfferToOrder(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                __typename
                order {
                  internalID
                  mode
                  totalListPriceCents
                  ... on CommerceOfferOrder {
                    myLastOffer {
                      internalID
                      amountCents
                      note
                    }
                  }
                }
              }
              ... on CommerceOrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,

      variables,
    })
  }

  const handleSubmitError = (error: { code: string }) => {
    logger.error(error)
    switch (error.code) {
      case "invalid_amount_cents": {
        dialog.showErrorDialog({
          message:
            "The offer amount is either missing or invalid. Please try again.",
          title: "Invalid offer",
        })
        break
      }
      default: {
        dialog.showErrorDialog()
        break
      }
    }
  }

  const onContinueButtonPressed = async () => {
    if (offerValue <= 0 || offerNoteValue.exceedsCharacterLimit) {
      setFormIsDirty(true)
      jumpTo("price-option-custom", { behavior: "smooth" })
      return
    }

    const artwork = order?.lineItems?.edges?.[0]?.node?.artwork
    const listPriceCents = order.totalListPriceCents
    const artworkPrice = artwork?.price
    const isInquiryCheckout = !artwork?.isPriceRange && !artwork?.price
    const hasPrice =
      (artwork?.listPrice?.__typename === "Money" &&
        artwork?.listPrice?.major) ||
      (artwork?.listPrice?.__typename === "PriceRange" &&
        artwork?.listPrice?.maxPrice?.major &&
        artwork?.listPrice?.minPrice?.major)
    const showPriceOptions =
      (artwork?.editionSets?.length ?? 0) < 2 && !!hasPrice
    const isPriceHidden = isNil(artworkPrice) || artworkPrice === ""
    const isRangeOffer = getOfferItemFromOrder(order.lineItems)
      ?.displayPriceRange

    if (
      !isPriceHidden &&
      !isRangeOffer &&
      (isInquiryCheckout || !showPriceOptions) &&
      !lowSpeedBumpEncountered &&
      offerValue * 100 < listPriceCents * 0.8
    ) {
      showLowSpeedbump()
      return
    }

    try {
      const hasNote = offerNoteValue && offerNoteValue.value.trim() !== ""

      let note = hasNote
        ? offerNoteValue.value
        : `${DEFUALT_OFFER_NOTE_PREFIX} ${appendCurrencySymbol(
            offerValue.toLocaleString("en-US", {
              currency: order.currencyCode,
              minimumFractionDigits: 2,
              style: "currency",
            }),
            order.currencyCode
          )}`

      const orderOrError = (
        await addInitialOfferToOrder({
          input: {
            amountCents: offerValue * 100,
            note,
            orderId: order.internalID,
          },
        })
      ).commerceAddInitialOfferToOrder?.orderOrError

      if (orderOrError?.error) {
        handleSubmitError(orderOrError.error)
        return
      }

      router.push(`/orders/${order.internalID}/shipping`)
    } catch (error) {
      logger.error(error)
      dialog.showErrorDialog()
    }
  }

  const offerItem = getOfferItemFromOrder(order.lineItems)
  const artwork = order.lineItems?.edges?.[0]?.node?.artwork
  const artworkId = artwork?.slug
  const orderCurrency = order.currencyCode
  const isInquiryCheckout = !artwork?.isPriceRange && !artwork?.price
  const hasPrice =
    (artwork?.listPrice?.__typename === "Money" && artwork?.listPrice?.major) ||
    (artwork?.listPrice?.__typename === "PriceRange" &&
      artwork?.listPrice?.maxPrice?.major &&
      artwork?.listPrice?.minPrice?.major)
  const showPriceOptions = (artwork?.editionSets?.length ?? 0) < 2 && !!hasPrice

  const priceNote = Boolean(offerItem?.price) && (
    <Text my={1} variant="sm" color="black60">
      List price: {appendCurrencySymbol(offerItem?.price, order.currencyCode)}
    </Text>
  )

  return (
    <OrderRouteContainer
      order={order}
      currentStep="Offer"
      steps={offerFlowSteps}
      content={
        <Flex
          flexDirection="column"
          style={isCommittingMutation ? { pointerEvents: "none" } : {}}
          id="offer-page-left-column"
        >
          {(isInquiryCheckout || !showPriceOptions) && (
            <>
              <Flex flexDirection="column">
                <OfferInput
                  id="OfferForm_offerValue"
                  showError={formIsDirty && offerValue <= 0}
                  onChange={offerValue => setOfferValue(offerValue)}
                  onFocus={onOfferInputFocus}
                  value={offerValue}
                />
              </Flex>
              {priceNote}
            </>
          )}
          {!isInquiryCheckout && showPriceOptions && (
            <>
              <Text variant="lg-display">Select an option</Text>
              <Text variant="xs" mt={4} mb={1}>
                Your offer
              </Text>
              <PriceOptionsFragmentContainer
                artwork={artwork}
                order={order}
                onChange={offerValue => setOfferValue(offerValue)}
                onFocus={onOfferInputFocus}
                showError={formIsDirty && offerValue <= 0}
              />
            </>
          )}

          {!order.isInquiryOrder && (
            <>
              <Spacer y={4} />
              <OfferNote
                onChange={offerNoteValue => setOfferNoteValue(offerNoteValue)}
                artworkId={artworkId!}
                value={offerNoteValue.value}
              />
            </>
          )}
          <Spacer y={[2, 4]} />
          <Message variant="info" title="All offers are binding">
            If your offer is accepted, payment will be processed immediately.
            Please note that this sale is not final until your offer is
            accepted.
          </Message>
          <Spacer y={[2, 4]} />
          <Media greaterThan="xs">
            <Button
              onClick={onContinueButtonPressed}
              loading={isCommittingMutation}
              variant="primaryBlack"
              width="50%"
            >
              Continue
            </Button>
          </Media>
        </Flex>
      }
      sidebar={
        <Flex flexDirection="column">
          <Flex flexDirection="column">
            <ArtworkSummaryItem order={order} />
            <TransactionDetailsSummaryItem
              transactionStep="offer"
              order={order}
              offerOverride={
                offerValue &&
                offerValue.toLocaleString("en-US", {
                  currency: orderCurrency,
                  minimumFractionDigits: 2,
                  style: "currency",
                })
              }
            />
          </Flex>
          <BuyerGuarantee
            contextModule={ContextModule.ordersOffer}
            contextPageOwnerType={OwnerType.ordersOffer}
          />
          <Spacer y={[2, 4]} />
          <Media at="xs">
            <>
              <Button
                onClick={onContinueButtonPressed}
                loading={isCommittingMutation}
                variant="primaryBlack"
                width="100%"
              >
                Continue
              </Button>
            </>
          </Media>
        </Flex>
      }
    />
  )
}

export const OfferFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(OfferRoute)),
  {
    order: graphql`
      fragment Offer_order on CommerceOrder {
        internalID
        mode
        state
        totalListPriceCents
        currencyCode
        lineItems {
          edges {
            node {
              artwork {
                slug
                price
                isPriceRange
                listPrice {
                  __typename
                  ... on Money {
                    major
                  }
                  ... on PriceRange {
                    maxPrice {
                      major
                    }
                    minPrice {
                      major
                    }
                  }
                }
                editionSets {
                  internalID
                }
                ...PriceOptions_artwork
              }
              artworkOrEditionSet {
                __typename
                ... on Artwork {
                  price
                  displayPriceRange
                }
                ... on EditionSet {
                  price
                  displayPriceRange
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          isInquiryOrder
          myLastOffer {
            note
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...PriceOptions_order
        ...OrderStepper_order
      }
    `,
  }
)
