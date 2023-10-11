import {
  BorderedRadio,
  Button,
  Text,
  Flex,
  RadioGroup,
  Spacer,
  TextAreaChange,
} from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { Respond_order$data } from "__generated__/Respond_order.graphql"
import { RespondCounterOfferMutation } from "__generated__/RespondCounterOfferMutation.graphql"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { OfferNote } from "Apps/Order/Components/OfferNote"
import { RevealButton } from "Apps/Order/Components/RevealButton"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { CountdownTimer } from "Components/CountdownTimer"
import { Match, Router, RouterState } from "found"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { PaymentMethodSummaryItemFragmentContainer as PaymentMethodSummaryItem } from "Apps/Order/Components/PaymentMethodSummaryItem"
import { OfferHistoryItemFragmentContainer as OfferHistoryItem } from "Apps/Order/Components/OfferHistoryItem"
import { counterofferFlowSteps } from "Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { isNil } from "lodash"
import { useTracking } from "react-tracking"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { extractNodes } from "Utils/extractNodes"

export interface RespondProps extends RouterState {
  order: Respond_order$data
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
  match: Match
  router: Router
}

type ResponseOptions = "ACCEPT" | "COUNTER" | "DECLINE" | null

export const logger = createLogger("Order/Routes/Respond/index.tsx")

export const RespondRoute: FC<RespondProps> = ({
  order,
  match,
  router,
  dialog,
  isCommittingMutation,
  commitMutation,
}) => {
  const { trackEvent } = useTracking()
  const artwork = extractNodes(order.lineItems)[0]?.artwork

  const [isFormDirty, setIsFormDirty] = useState(false)
  const [offerValue, setOfferValue] = useState(0)
  const [responseOption, setResponseOption] = useState<ResponseOptions>(null)
  const [lowSpeedBumpEncountered, setLowSpeedBumpEncountered] = useState(false)
  const [highSpeedBumpEncountered, setHighSpeedBumpEncountered] = useState(
    false
  )
  const [offerNoteValue, setOfferNoteValue] = useState<TextAreaChange>({
    exceedsCharacterLimit: false,
    value: "",
  })

  const onOfferInputFocus = () => {
    trackEvent({
      action_type: DeprecatedSchema.ActionType.FocusedOnOfferInput,
      flow: DeprecatedSchema.Flow.MakeOffer,
      order_id: order.internalID,
    })
  }

  const showLowSpeedbump = () => {
    trackEvent({
      action_type: DeprecatedSchema.ActionType.ViewedOfferTooLow,
      flow: DeprecatedSchema.Flow.MakeOffer,
      order_id: order.internalID,
    })

    setLowSpeedBumpEncountered(true)

    dialog.showErrorDialog({
      continueButtonText: "OK",
      message:
        "Offers within 25% of the seller's offer are most likely to receive a response.",
      title: "Offer may be too low",
    })
  }

  const showHighSpeedbump = () => {
    trackEvent({
      action_type: DeprecatedSchema.ActionType.ViewedOfferHigherThanListPrice,
      flow: DeprecatedSchema.Flow.MakeOffer,
      order_id: order.internalID,
    })

    setHighSpeedBumpEncountered(true)

    dialog.showErrorDialog({
      continueButtonText: "OK",
      message: "You’re making an offer higher than the seller's offer.",
      title: "Offer higher than seller's offer",
    })
  }

  const onContinueButtonPressed = async () => {
    const search = match?.location.search || ""
    const artworkPrice = artwork?.price
    const isPriceHidden = isNil(artworkPrice) || artworkPrice === ""

    if (responseOption === "ACCEPT") {
      router.push(`/orders/${order.internalID}/review/accept${search}`)
      return
    }

    if (responseOption === "DECLINE") {
      router.push(`/orders/${order.internalID}/review/decline${search}`)
      return
    }

    // responseOption === "COUNTER"

    if (offerValue <= 0 || offerNoteValue.exceedsCharacterLimit) {
      setIsFormDirty(true)
      return
    }
    const currentOfferPrice = order.itemsTotalCents

    if (
      !lowSpeedBumpEncountered &&
      offerValue * 100 < currentOfferPrice! * 0.75
    ) {
      showLowSpeedbump()
      return
    }

    if (
      !highSpeedBumpEncountered &&
      offerValue * 100 > currentOfferPrice! &&
      !isPriceHidden
    ) {
      showHighSpeedbump()
      return
    }

    try {
      const orderOrError = (
        await createCounterOffer({
          input: {
            amountCents: offerValue * 100,
            note: offerNoteValue && offerNoteValue.value,
            offerId: order?.lastOffer?.internalID!,
          },
        })
      ).commerceBuyerCounterOffer?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      router.push(`/orders/${order.internalID}/review/counter${search}`)
    } catch (error) {
      logger.error(error)
      dialog.showErrorDialog()
    }
  }

  const createCounterOffer = (
    variables: RespondCounterOfferMutation["variables"]
  ) => {
    return commitMutation<RespondCounterOfferMutation>({
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation RespondCounterOfferMutation(
          $input: CommerceBuyerCounterOfferInput!
        ) {
          commerceBuyerCounterOffer(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  ...Respond_order
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

  return (
    <OrderRouteContainer
      order={order}
      currentStep="Respond"
      steps={counterofferFlowSteps}
      content={
        <Flex
          flexDirection="column"
          style={isCommittingMutation ? { pointerEvents: "none" } : {}}
        >
          <Flex flexDirection="column">
            <CountdownTimer
              action="Respond"
              note="Expiration will end negotiations on this offer. Keep in mind the work can be sold to another buyer in the meantime."
              countdownStart={order.lastOffer?.createdAt!}
              countdownEnd={order.stateExpiresAt!}
            />

            <OfferHistoryItem order={order} />
            <TransactionDetailsSummaryItem
              order={order}
              useLastSubmittedOffer
            />
          </Flex>
          <Spacer y={[2, 4]} />
          <RadioGroup
            onSelect={responseOption =>
              setResponseOption(responseOption as ResponseOptions)
            }
            defaultValue={responseOption!}
          >
            <BorderedRadio
              value="ACCEPT"
              label="Accept seller's offer"
              data-test="AcceptOffer"
            />
            <BorderedRadio
              value="COUNTER"
              position="relative"
              label="Send counteroffer"
              data-test="SendCounteroffer"
            >
              <Collapse open={responseOption === "COUNTER"}>
                <Spacer y={2} />
                <OfferInput
                  id="RespondForm_RespondValue"
                  showError={isFormDirty && offerValue <= 0}
                  onChange={setOfferValue}
                  onFocus={onOfferInputFocus}
                  value={offerValue}
                />
                {!order.isInquiryOrder && (
                  <>
                    <Spacer y={1} />
                    <RevealButton align="left" buttonLabel="Add note to seller">
                      <Spacer y={1} />
                      <OfferNote
                        onChange={setOfferNoteValue}
                        artworkId={artwork?.slug!}
                        counteroffer
                      />
                    </RevealButton>
                  </>
                )}
              </Collapse>
            </BorderedRadio>
            <BorderedRadio
              value="DECLINE"
              position="relative"
              label="Decline seller's offer"
              data-test="DeclineOffer"
            >
              <Flex position="relative">
                <Collapse open={responseOption === "DECLINE"}>
                  <Spacer y={1} />
                  <Text variant="xs" color="black60">
                    Declining an offer will end the negotiation process on this
                    offer.
                  </Text>
                </Collapse>
              </Flex>
            </BorderedRadio>
          </RadioGroup>
          <Spacer y={[2, 4]} />
          <Flex flexDirection="column" />
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

            <ShippingSummaryItem order={order} locked />

            <PaymentMethodSummaryItem order={order} locked />
          </Flex>
          <BuyerGuarantee
            contextModule={ContextModule.ordersRespond}
            contextPageOwnerType={OwnerType.ordersRespond}
          />
          <Spacer y={2} />
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

export const RespondFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(RespondRoute)),
  {
    order: graphql`
      fragment Respond_order on CommerceOrder {
        internalID
        mode
        state
        currencyCode
        itemsTotal(precision: 2)
        itemsTotalCents
        stateExpiresAt
        lastTransactionFailed
        lineItems {
          edges {
            node {
              artwork {
                slug
                price
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          isInquiryOrder
          lastOffer {
            createdAt
            internalID
            note
          }
          myLastOffer {
            createdAt
          }
        }
        ...TransactionDetailsSummaryItem_order
        ...ArtworkSummaryItem_order
        ...ShippingSummaryItem_order
        ...PaymentMethodSummaryItem_order
        ...OfferHistoryItem_order
        ...OrderStepper_order
      }
    `,
  }
)
