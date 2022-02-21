import { Button, Flex, Text, Spacer } from "@artsy/palette"
import { Reject_order$data } from "v2/__generated__/Reject_order.graphql"
import { RejectOfferMutation } from "v2/__generated__/RejectOfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "v2/Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { Router } from "found"
import { Component } from "react"

import { CountdownTimer } from "v2/Components/CountdownTimer"
import { StepSummaryItem } from "v2/Components/StepSummaryItem"
import { Media } from "v2/Utils/Responsive"
import { logger } from "../Respond"

import {
  OrderStepper,
  counterofferFlowSteps,
} from "v2/Apps/Order/Components/OrderStepper"

import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"

interface RejectProps {
  order: Reject_order$data
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export class Reject extends Component<RejectProps> {
  rejectOffer(variables: RejectOfferMutation["variables"]) {
    return this.props.commitMutation<RejectOfferMutation>({
      variables,
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation RejectOfferMutation($input: CommerceBuyerRejectOfferInput!) {
          commerceBuyerRejectOffer(input: $input) {
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
      const orderOrError = (
        await this.rejectOffer({
          input: {
            offerId: this.props.order.lastOffer?.internalID!,
          },
        })
      ).commerceBuyerRejectOffer?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      this.props.router.push(`/orders/${this.props.order.internalID}/status`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.internalID}/respond`)
  }

  render() {
    const { order, isCommittingMutation } = this.props

    return (
      <>
        <OrderStepper currentStep="Review" steps={counterofferFlowSteps} />
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
                  countdownStart={order.lastOffer?.createdAt!}
                  countdownEnd={order.stateExpiresAt!}
                />
                <StepSummaryItem
                  title="Decline seller's offer"
                  onChange={this.onChangeResponse}
                >
                  <Text variant="xs" color="black60">
                    Declining an offer permanently ends the negotiation process.
                    The seller will not be able to make a counteroffer.
                  </Text>
                </StepSummaryItem>
              </Flex>
              <Spacer mb={[2, 4]} />
              <Media greaterThan="xs">
                <Button
                  onClick={this.onSubmit}
                  loading={isCommittingMutation}
                  variant="primaryBlack"
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
              <Media greaterThan="xs">
                <Flex flexDirection="column">
                  <ArtworkSummaryItem order={order} />
                </Flex>
                <Spacer mb={2} />
              </Media>
              <Media at="xs">
                <>
                  <Button
                    onClick={this.onSubmit}
                    loading={isCommittingMutation}
                    variant="primaryBlack"
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
      </>
    )
  }
}

export const RejectFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(Reject)),
  {
    order: graphql`
      fragment Reject_order on CommerceOrder {
        internalID
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
            internalID
            createdAt
          }
        }
        ...ArtworkSummaryItem_order
      }
    `,
  }
)
