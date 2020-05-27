import {
  BorderedRadio,
  Button,
  Col,
  Collapse,
  Flex,
  RadioGroup,
  Row,
  Sans,
  Spacer,
  TextAreaChange,
} from "@artsy/palette"
import { Respond_order } from "v2/__generated__/Respond_order.graphql"
import { RespondCounterOfferMutation } from "v2/__generated__/RespondCounterOfferMutation.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
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
import { track } from "v2/Artsy"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { CountdownTimer } from "v2/Components/CountdownTimer"
import { Router } from "found"
import React, { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { OfferHistoryItemFragmentContainer as OfferHistoryItem } from "../../Components/OfferHistoryItem"
import {
  OrderStepper,
  counterofferFlowSteps,
} from "../../Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "../../Components/ShippingSummaryItem"

export interface RespondProps {
  order: Respond_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface RespondState {
  offerValue: number
  offerNoteValue: TextAreaChange
  formIsDirty: boolean
  responseOption: "ACCEPT" | "COUNTER" | "DECLINE"
  lowSpeedBumpEncountered: boolean
  highSpeedBumpEncountered: boolean
}

export const logger = createLogger("Order/Routes/Respond/index.tsx")

@track()
export class RespondRoute extends Component<RespondProps, RespondState> {
  state: RespondState = {
    offerValue: 0,
    offerNoteValue: { value: "", exceedsCharacterLimit: false },
    responseOption: null,
    formIsDirty: false,
    lowSpeedBumpEncountered: false,
    highSpeedBumpEncountered: false,
  }

  @track<RespondProps>(props => ({
    order_id: props.order.internalID,
    action_type: Schema.ActionType.FocusedOnOfferInput,
    flow: Schema.Flow.MakeOffer,
  }))
  onOfferInputFocus() {
    // noop
  }

  @track<RespondProps>(props => ({
    order_id: props.order.internalID,
    action_type: Schema.ActionType.ViewedOfferTooLow,
    flow: Schema.Flow.MakeOffer,
  }))
  showLowSpeedbump() {
    this.setState({ lowSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer may be too low",
      message:
        "Offers within 25% of the seller's offer are most likely to receive a response.",
      continueButtonText: "OK",
    })
  }

  @track<RespondProps>(props => ({
    order_id: props.order.internalID,
    action_type: Schema.ActionType.ViewedOfferHigherThanListPrice,
    flow: Schema.Flow.MakeOffer,
  }))
  showHighSpeedbump() {
    this.setState({ highSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer higher than seller's offer",
      message: "You’re making an offer higher than the seller's offer.",
      continueButtonText: "OK",
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

    if (responseOption === "ACCEPT") {
      this.props.router.push(
        `/orders/${this.props.order.internalID}/review/accept`
      )
      return
    }

    if (responseOption === "DECLINE") {
      this.props.router.push(
        `/orders/${this.props.order.internalID}/review/decline`
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
      offerValue * 100 < currentOfferPrice * 0.75
    ) {
      this.showLowSpeedbump()
      return
    }

    if (
      !highSpeedBumpEncountered &&
      this.state.offerValue * 100 > currentOfferPrice
    ) {
      this.showHighSpeedbump()
      return
    }

    try {
      const orderOrError = (
        await this.createCounterOffer({
          input: {
            offerId: this.props.order.lastOffer.internalID,
            amountCents: this.state.offerValue * 100,
            note: this.state.offerNoteValue && this.state.offerNoteValue.value,
          },
        })
      ).commerceBuyerCounterOffer.orderOrError

      if (orderOrError.error) {
        throw orderOrError.error
      }

      this.props.router.push(
        `/orders/${this.props.order.internalID}/review/counter`
      )
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  createCounterOffer(variables: RespondCounterOfferMutation["variables"]) {
    return this.props.commitMutation<RespondCounterOfferMutation>({
      variables,
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
    })
  }

  render() {
    const { order, isCommittingMutation } = this.props

    const artworkId = order.lineItems.edges[0].node.artwork.slug

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Respond"
                steps={counterofferFlowSteps}
              />
            </Col>
          </Row>
        </HorizontalPadding>

        <HorizontalPadding>
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
                    countdownStart={order.lastOffer.createdAt}
                    countdownEnd={order.stateExpiresAt}
                  />
                  <OfferHistoryItem order={order} />
                  <TransactionDetailsSummaryItem
                    order={order}
                    useLastSubmittedOffer
                  />
                </Flex>
                <Spacer mb={[2, 3]} />
                <RadioGroup
                  onSelect={(responseOption: any) =>
                    this.setState({ responseOption })
                  }
                  defaultValue={this.state.responseOption}
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
                      <Spacer mb={0.5} />
                      <RevealButton
                        align="left"
                        buttonLabel="Add note to seller"
                      >
                        <Spacer mb={1} />
                        <OfferNote
                          onChange={offerNoteValue =>
                            this.setState({ offerNoteValue })
                          }
                          artworkId={artworkId}
                          counteroffer
                        />
                      </RevealButton>
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
                        <Sans size="2" color="black60">
                          Declining an offer will end the negotiation process on
                          this offer.
                        </Sans>
                      </Collapse>
                    </Flex>
                  </BorderedRadio>
                </RadioGroup>
                <Spacer mb={[2, 3]} />
                <Flex flexDirection="column" />
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onContinueButtonPressed}
                    loading={isCommittingMutation}
                    size="large"
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
                  <CreditCardSummaryItem order={order} locked />
                </Flex>
                <Spacer mb={2} />
                <Media at="xs">
                  <>
                    <Button
                      onClick={this.onContinueButtonPressed}
                      loading={isCommittingMutation}
                      size="large"
                      width="100%"
                    >
                      Continue
                    </Button>
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
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
        totalListPrice(precision: 2)
        totalListPriceCents
        stateExpiresAt
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
            }
          }
        }
        ... on CommerceOfferOrder {
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
        ...CreditCardSummaryItem_order
        ...OfferHistoryItem_order
      }
    `,
  }
)
