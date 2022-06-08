import {
  BorderedRadio,
  Button,
  Text,
  Collapse,
  Flex,
  RadioGroup,
  Spacer,
  TextAreaChange,
} from "@artsy/palette"
import { Respond_order } from "v2/__generated__/Respond_order.graphql"
import { RespondCounterOfferMutation } from "v2/__generated__/RespondCounterOfferMutation.graphql"
import { OfferInput } from "v2/Apps/Order/Components/OfferInput"
import { OfferNote } from "v2/Apps/Order/Components/OfferNote"
import { RevealButton } from "v2/Apps/Order/Components/RevealButton"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { track } from "v2/System"
import * as Schema from "v2/System/Analytics/Schema"
import { CountdownTimer } from "v2/Components/CountdownTimer"
import { RouterState } from "found"
import { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { PaymentMethodSummaryItemFragmentContainer as PaymentMethodSummaryItem } from "../../Components/PaymentMethodSummaryItem"
import { OfferHistoryItemFragmentContainer as OfferHistoryItem } from "../../Components/OfferHistoryItem"
import {
  OrderStepper,
  counterofferFlowSteps,
} from "../../Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "../../Components/ShippingSummaryItem"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { isNil } from "lodash"

export interface RespondProps extends RouterState {
  order: Respond_order
  relay?: RelayProp
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface RespondState {
  offerValue: number
  offerNoteValue: TextAreaChange
  formIsDirty: boolean
  responseOption: "ACCEPT" | "COUNTER" | "DECLINE" | null
  lowSpeedBumpEncountered: boolean
  highSpeedBumpEncountered: boolean
}

export const logger = createLogger("Order/Routes/Respond/index.tsx")

@track()
export class RespondRoute extends Component<RespondProps, RespondState> {
  state: RespondState = {
    formIsDirty: false,
    highSpeedBumpEncountered: false,
    lowSpeedBumpEncountered: false,
    offerNoteValue: { exceedsCharacterLimit: false, value: "" },
    offerValue: 0,
    responseOption: null,
  }

  @track<RespondProps>(props => ({
    action_type: Schema.ActionType.FocusedOnOfferInput,
    flow: Schema.Flow.MakeOffer,
    order_id: props.order.internalID,
  }))
  onOfferInputFocus() {
    // noop
  }

  @track<RespondProps>(props => ({
    action_type: Schema.ActionType.ViewedOfferTooLow,
    flow: Schema.Flow.MakeOffer,
    order_id: props.order.internalID,
  }))
  showLowSpeedbump() {
    this.setState({ lowSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      continueButtonText: "OK",
      message:
        "Offers within 25% of the seller's offer are most likely to receive a response.",
      title: "Offer may be too low",
    })
  }

  @track<RespondProps>(props => ({
    action_type: Schema.ActionType.ViewedOfferHigherThanListPrice,
    flow: Schema.Flow.MakeOffer,
    order_id: props.order.internalID,
  }))
  showHighSpeedbump() {
    this.setState({ highSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      continueButtonText: "OK",
      message: "You’re making an offer higher than the seller's offer.",
      title: "Offer higher than seller's offer",
    })
  }

  onContinueButtonPressed = async () => {
    const {
      responseOption,
      offerValue,
      offerNoteValue,
      lowSpeedBumpEncountered,
      highSpeedBumpEncountered,
    } = this.state

    const search = this.props.match?.location.search || ""
    const artworkPrice = this?.props?.order?.lineItems?.edges?.[0]?.node
      ?.artwork?.price
    const isPriceHidden = isNil(artworkPrice) || artworkPrice === ""

    if (responseOption === "ACCEPT") {
      this.props.router.push(
        `/orders/${this.props.order.internalID}/review/accept${search}`
      )
      return
    }

    if (responseOption === "DECLINE") {
      this.props.router.push(
        `/orders/${this.props.order.internalID}/review/decline${search}`
      )
      return
    }

    // responseOption === "COUNTER"

    if (offerValue <= 0 || offerNoteValue.exceedsCharacterLimit) {
      this.setState({ formIsDirty: true })
      return
    }
    const currentOfferPrice = this.props.order.itemsTotalCents

    if (
      !lowSpeedBumpEncountered &&
      offerValue * 100 < currentOfferPrice! * 0.75
    ) {
      this.showLowSpeedbump()
      return
    }

    if (
      !highSpeedBumpEncountered &&
      this.state.offerValue * 100 > currentOfferPrice! &&
      !isPriceHidden
    ) {
      this.showHighSpeedbump()
      return
    }

    try {
      const orderOrError = (
        await this.createCounterOffer({
          input: {
            amountCents: this.state.offerValue * 100,
            note: this.state.offerNoteValue && this.state.offerNoteValue.value,
            offerId: this.props.order?.lastOffer?.internalID!,
          },
        })
      ).commerceBuyerCounterOffer?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      this.props.router.push(
        `/orders/${this.props.order.internalID}/review/counter${search}`
      )
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  createCounterOffer(variables: RespondCounterOfferMutation["variables"]) {
    return this.props.commitMutation<RespondCounterOfferMutation>({
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

  render() {
    const { order, isCommittingMutation } = this.props

    const artworkId = order.lineItems?.edges?.[0]?.node?.artwork?.slug

    return (
      <>
        <OrderStepper currentStep="Respond" steps={counterofferFlowSteps} />
        <TwoColumnLayout
          Content={
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
              <Spacer mb={[2, 4]} />
              <RadioGroup
                onSelect={(responseOption: any) =>
                  this.setState({ responseOption })
                }
                defaultValue={this.state.responseOption!}
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
                  <Collapse open={this.state.responseOption === "COUNTER"}>
                    <Spacer mb={2} />
                    <OfferInput
                      id="RespondForm_RespondValue"
                      showError={
                        this.state.formIsDirty && this.state.offerValue <= 0
                      }
                      onChange={offerValue => this.setState({ offerValue })}
                      onFocus={this.onOfferInputFocus.bind(this)}
                    />
                    {!order.isInquiryOrder && (
                      <>
                        <Spacer mb={1} />
                        <RevealButton
                          align="left"
                          buttonLabel="Add note to seller"
                        >
                          <Spacer mb={1} />
                          <OfferNote
                            onChange={offerNoteValue =>
                              this.setState({ offerNoteValue })
                            }
                            artworkId={artworkId!}
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
                    <Collapse open={this.state.responseOption === "DECLINE"}>
                      <Spacer mb={1} />
                      <Text variant="xs" color="black60">
                        Declining an offer will end the negotiation process on
                        this offer.
                      </Text>
                    </Collapse>
                  </Flex>
                </BorderedRadio>
              </RadioGroup>
              <Spacer mb={[2, 4]} />
              <Flex flexDirection="column" />
              <Media greaterThan="xs">
                <Button
                  onClick={this.onContinueButtonPressed}
                  loading={isCommittingMutation}
                  variant="primaryBlack"
                  width="100%"
                >
                  Continue
                </Button>
              </Media>
            </Flex>
          }
          Sidebar={
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
              <Spacer mb={2} />
              <Media at="xs">
                <>
                  <Button
                    onClick={this.onContinueButtonPressed}
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
      </>
    )
  }
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
      }
    `,
  }
)
