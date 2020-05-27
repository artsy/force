import {
  Button,
  Col,
  Flex,
  Message,
  Row,
  Sans,
  Spacer,
  TextAreaChange,
} from "@artsy/palette"
import { Offer_order } from "v2/__generated__/Offer_order.graphql"
import { OfferMutation } from "v2/__generated__/OfferMutation.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
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
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics"
import { Router } from "found"
import React, { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { OrderStepper, offerFlowSteps } from "../../Components/OrderStepper"

export interface OfferProps {
  order: Offer_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface OfferState {
  offerValue: number
  offerNoteValue: TextAreaChange
  formIsDirty: boolean
  lowSpeedBumpEncountered: boolean
  highSpeedBumpEncountered: boolean
}

const logger = createLogger("Order/Routes/Offer/index.tsx")

@track()
export class OfferRoute extends Component<OfferProps, OfferState> {
  state: OfferState = {
    offerValue: 0,
    offerNoteValue: { value: "", exceedsCharacterLimit: false },
    formIsDirty: false,
    lowSpeedBumpEncountered: false,
    highSpeedBumpEncountered: false,
  }

  @track<OfferProps>(props => ({
    order_id: props.order.internalID,
    action_type: Schema.ActionType.FocusedOnOfferInput,
    flow: Schema.Flow.MakeOffer,
  }))
  onOfferInputFocus() {
    // noop
  }

  @track<OfferProps>(props => ({
    order_id: props.order.internalID,
    action_type: Schema.ActionType.ViewedOfferTooLow,
    flow: Schema.Flow.MakeOffer,
  }))
  showLowSpeedbump() {
    this.setState({ lowSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer may be too low",
      message:
        "Offers within 25% of the list price are most likely to receive a response.",
      continueButtonText: "OK",
    })
  }

  @track<OfferProps>(props => ({
    order_id: props.order.internalID,
    action_type: Schema.ActionType.ViewedOfferHigherThanListPrice,
    flow: Schema.Flow.MakeOffer,
  }))
  showHighSpeedbump() {
    this.setState({ highSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer higher than list price",
      message: "You’re making an offer higher than the list price.",
      continueButtonText: "OK",
    })
  }

  addInitialOfferToOrder(variables: OfferMutation["variables"]) {
    return this.props.commitMutation<OfferMutation>({
      variables,
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
                  totalListPrice
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
    })
  }

  handleSubmitError(error: { code: string }) {
    logger.error(error)
    switch (error.code) {
      case "invalid_amount_cents": {
        this.props.dialog.showErrorDialog({
          title: "Invalid offer",
          message:
            "The offer amount is either missing or invalid. Please try again.",
        })
        break
      }
      default: {
        this.props.dialog.showErrorDialog()
        break
      }
    }
  }

  onContinueButtonPressed = async () => {
    const {
      offerValue,
      offerNoteValue,
      lowSpeedBumpEncountered,
      highSpeedBumpEncountered,
    } = this.state

    if (offerValue <= 0 || offerNoteValue.exceedsCharacterLimit) {
      this.setState({ formIsDirty: true })
      return
    }

    const listPriceCents = this.props.order.totalListPriceCents

    if (!lowSpeedBumpEncountered && offerValue * 100 < listPriceCents * 0.75) {
      this.showLowSpeedbump()
      return
    }

    if (
      !highSpeedBumpEncountered &&
      this.state.offerValue * 100 > listPriceCents
    ) {
      this.showHighSpeedbump()
      return
    }

    try {
      const orderOrError = (
        await this.addInitialOfferToOrder({
          input: {
            note: this.state.offerNoteValue && this.state.offerNoteValue.value,
            orderId: this.props.order.internalID,
            amountCents: offerValue * 100,
          },
        })
      ).commerceAddInitialOfferToOrder.orderOrError

      if (orderOrError.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }

      this.props.router.push(`/orders/${this.props.order.internalID}/shipping`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  render() {
    const { order, isCommittingMutation } = this.props

    const artworkId = order.lineItems.edges[0].node.artwork.slug
    const orderCurrency = order.currencyCode

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper currentStep="Offer" steps={offerFlowSteps} />
            </Col>
          </Row>
        </HorizontalPadding>

        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <Flex
                flexDirection="column"
                style={isCommittingMutation ? { pointerEvents: "none" } : {}}
                id="offer-page-left-column"
              >
                <Flex flexDirection="column">
                  <OfferInput
                    id="OfferForm_offerValue"
                    showError={
                      this.state.formIsDirty && this.state.offerValue <= 0
                    }
                    onChange={offerValue => this.setState({ offerValue })}
                    onFocus={this.onOfferInputFocus.bind(this)}
                  />
                </Flex>
                {Boolean(order.totalListPrice) && (
                  <Sans size="2" color="black60">
                    List price: {order.totalListPrice}
                  </Sans>
                )}
                <Spacer mb={[2, 3]} />
                <RevealButton align="left" buttonLabel="Add note to seller">
                  <OfferNote
                    onChange={offerNoteValue =>
                      this.setState({ offerNoteValue })
                    }
                    artworkId={artworkId}
                  />
                </RevealButton>
                <Spacer mb={[2, 3]} />
                <Message p={[2, 3]}>
                  If your offer is accepted, your payment will be processed
                  immediately. Keep in mind making an offer doesn’t guarantee
                  you the work, as the seller might be receiving higher offers.
                </Message>
                <Spacer mb={[2, 3]} />
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
                  <TransactionDetailsSummaryItem
                    order={order}
                    offerOverride={
                      this.state.offerValue &&
                      this.state.offerValue.toLocaleString("en-US", {
                        style: "currency",
                        currency: orderCurrency,
                        minimumFractionDigits: 2,
                      })
                    }
                  />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media at="xs">
                  <>
                    <Spacer mb={3} />
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

export const OfferFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(OfferRoute)),
  {
    order: graphql`
      fragment Offer_order on CommerceOrder {
        internalID
        mode
        state
        totalListPrice(precision: 2)
        totalListPriceCents
        currencyCode
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
            }
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
