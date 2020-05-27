import { Button, Col, Flex, Row, Spacer } from "@artsy/palette"
import { Accept_order } from "v2/__generated__/Accept_order.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { track } from "v2/Artsy/Analytics"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import { Media } from "v2/Utils/Responsive"
import {
  OrderStepper,
  counterofferFlowSteps,
} from "../../Components/OrderStepper"

import { RelayProp, createFragmentContainer, graphql } from "react-relay"

import { AcceptOfferMutation } from "v2/__generated__/AcceptOfferMutation.graphql"
import { ConditionsOfSaleDisclaimer } from "v2/Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "v2/Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { CountdownTimer } from "v2/Components/CountdownTimer"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"

interface AcceptProps {
  order: Accept_order
  relay?: RelayProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Offer/index.tsx")

@track()
export class Accept extends Component<AcceptProps> {
  acceptOffer() {
    return this.props.commitMutation<AcceptOfferMutation>({
      variables: {
        input: { offerId: this.props.order.lastOffer.internalID },
      },
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation AcceptOfferMutation($input: CommerceBuyerAcceptOfferInput!) {
          commerceBuyerAcceptOffer(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                __typename
                order {
                  internalID
                  ... on CommerceOfferOrder {
                    awaitingResponseFrom
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

  onSubmit = async () => {
    try {
      const orderOrError = (await this.acceptOffer()).commerceBuyerAcceptOffer
        .orderOrError

      if (orderOrError.error) {
        this.handleAcceptError(orderOrError.error)
        return
      }

      this.props.router.push(`/orders/${this.props.order.internalID}/status`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  async handleAcceptError(error: { code: string; data: string }) {
    logger.error(error)
    switch (error.code) {
      case "capture_failed": {
        const parsedData = get(error, e => JSON.parse(e.data), {})

        // https://stripe.com/docs/declines/codes
        if (parsedData.decline_code === "insufficient_funds") {
          this.showCardFailureDialog({
            title: "Insufficient funds",
            message:
              "There aren’t enough funds available on the card you provided. Please use a new card. Alternatively, contact your card provider, then press “Submit” again.",
          })
        } else {
          this.showCardFailureDialog({
            title: "Charge failed",
            message:
              "Payment authorization has been declined. Please contact your card provider, then press “Submit” again. Alternatively, use a new card.",
          })
        }
        break
      }
      case "insufficient_inventory": {
        await this.props.dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        this.routeToArtistPage()
        break
      }
      default:
        this.props.dialog.showErrorDialog()
    }
  }

  async showCardFailureDialog(props: { title: string; message: string }) {
    const { confirmed } = await this.props.dialog.showConfirmDialog({
      ...props,
      cancelButtonText: "OK",
      confirmButtonText: "Use new card",
    })
    if (confirmed) {
      this.props.router.push(
        `/orders/${this.props.order.internalID}/payment/new`
      )
    }
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.internalID}/respond`)
  }

  artistId() {
    return get(
      this.props.order,
      o => o.lineItems.edges[0].node.artwork.artists[0].slug
    )
  }

  routeToArtistPage() {
    const artistId = this.artistId()

    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }

  render() {
    const { order, isCommittingMutation } = this.props

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Review"
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
                <Media at="xs">
                  <Flex flexDirection="column">
                    <ArtworkSummaryItem order={order} />
                  </Flex>
                  <Spacer mb={2} />
                </Media>
                <Flex flexDirection="column">
                  <CountdownTimer
                    action="Respond"
                    note="Expired offers end the negotiation process permanently."
                    countdownStart={order.lastOffer.createdAt}
                    countdownEnd={order.stateExpiresAt}
                  />
                  <TransactionDetailsSummaryItem
                    order={order}
                    title="Accept seller's offer"
                    useLastSubmittedOffer={true}
                    onChange={this.onChangeResponse}
                  />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onSubmit}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Submit
                  </Button>
                  <Spacer mb={2} />
                  <ConditionsOfSaleDisclaimer textAlign="center" />
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <Media greaterThan="xs">
                    {className => (
                      <ArtworkSummaryItem className={className} order={order} />
                    )}
                  </Media>
                  <ShippingSummaryItem order={order} locked />
                  <CreditCardSummaryItem order={order} locked />
                </Flex>
                <Media greaterThan="xs">
                  <Spacer mb={2} />
                </Media>
                <Media at="xs">
                  <>
                    <Spacer mb={2} />
                    <Button
                      onClick={this.onSubmit}
                      loading={isCommittingMutation}
                      size="large"
                      width="100%"
                    >
                      Submit
                    </Button>
                    <Spacer mb={2} />
                    <ConditionsOfSaleDisclaimer />
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

export const AcceptFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(Accept)),
  {
    order: graphql`
      fragment Accept_order on CommerceOrder {
        internalID
        stateExpiresAt
        lineItems {
          edges {
            node {
              artwork {
                slug
                artists {
                  slug
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          lastOffer {
            internalID
            createdAt
          }
        }
        ...TransactionDetailsSummaryItem_order
        ...ArtworkSummaryItem_order
        ...ShippingSummaryItem_order
        ...CreditCardSummaryItem_order
      }
    `,
  }
)
