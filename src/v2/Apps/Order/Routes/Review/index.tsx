import { Box, Button, Flex, Join, Message, Spacer, Text } from "@artsy/palette"
import { Review_order } from "v2/__generated__/Review_order.graphql"
import { ReviewSubmitOfferOrderMutation } from "v2/__generated__/ReviewSubmitOfferOrderMutation.graphql"
import { ReviewSubmitOrderMutation } from "v2/__generated__/ReviewSubmitOrderMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "v2/Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ItemReviewFragmentContainer as ItemReview } from "v2/Apps/Order/Components/ItemReview"
import {
  OrderStepper,
  buyNowFlowSteps,
  offerFlowSteps,
} from "v2/Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "v2/Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { OfferSummaryItemFragmentContainer as OfferSummaryItem } from "../../Components/OfferSummaryItem"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { createStripeWrapper } from "v2/Utils/createStripeWrapper"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { withSystemContext } from "v2/System"
import { ShippingArtaSummaryItemFragmentContainer } from "../../Components/ShippingArtaSummaryItem"
export interface ReviewProps {
  stripe: Stripe
  elements: StripeElements
  order: Review_order
  relay?: RelayProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
  isEigen: boolean | undefined
}

const logger = createLogger("Order/Routes/Review/index.tsx")

@track()
export class ReviewRoute extends Component<ReviewProps> {
  @track<ReviewProps>(props => ({
    action_type:
      props.order.mode === "BUY"
        ? Schema.ActionType.SubmittedOrder
        : Schema.ActionType.SubmittedOffer,
    order_id: props.order.internalID,
    products: [
      {
        product_id:
          props.order.lineItems?.edges?.[0]?.node?.artwork?.internalID,
        quantity: 1,
        price: props.order.itemsTotal,
      },
    ],
  }))
  async onSubmit(setupIntentId?: any) {
    try {
      const orderOrError =
        this.props.order.mode === "BUY"
          ? (await this.submitBuyOrder()).commerceSubmitOrder?.orderOrError
          : (await this.submitOffer(setupIntentId)).commerceSubmitOrderWithOffer
              ?.orderOrError
      if (orderOrError?.error) {
        this.handleSubmitError(orderOrError?.error!)
        return
      } else if (
        this.props.order.mode === "BUY" &&
        orderOrError?.actionData &&
        orderOrError.actionData.clientSecret
      ) {
        this.props.stripe
          .handleCardAction(orderOrError.actionData.clientSecret)
          .then(result => {
            if (result.error) {
              this.props.dialog.showErrorDialog({
                title: "An error occurred",
                message: result.error.message,
              })
              return
            } else {
              this.onSubmit()
            }
          })
      } else if (
        this.props.order.mode === "OFFER" &&
        orderOrError?.actionData &&
        orderOrError.actionData.clientSecret
      ) {
        this.props.stripe
          .confirmCardSetup(orderOrError.actionData.clientSecret)
          .then(result => {
            if (result.error) {
              this.props.dialog.showErrorDialog({
                title: "An error occurred",
                message: result.error.message,
              })
              return
            } else {
              this.onSubmit(result.setupIntent?.id)
            }
          })
      } else {
        this.props.order.conversation && !this.props.isEigen
          ? this.props.router.push(
              `/user/conversations/${this.props.order.conversation.internalID}`
            )
          : this.props.router.push(
              `/orders/${this.props.order.internalID}/status`
            )
      }
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  submitBuyOrder() {
    return this.props.commitMutation<ReviewSubmitOrderMutation>({
      variables: {
        input: {
          id: this.props.order.internalID,
        },
      },
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation ReviewSubmitOrderMutation($input: CommerceSubmitOrderInput!) {
          commerceSubmitOrder(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  state
                }
              }
              ... on CommerceOrderRequiresAction {
                actionData {
                  clientSecret
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

  submitOffer(setupIntentId: string | null) {
    return this.props.commitMutation<ReviewSubmitOfferOrderMutation>({
      variables: {
        input: {
          offerId: this.props.order.myLastOffer?.internalID,
          confirmedSetupIntentId: setupIntentId,
        },
      },
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation ReviewSubmitOfferOrderMutation(
          $input: CommerceSubmitOrderWithOfferInput!
        ) {
          commerceSubmitOrderWithOffer(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  state
                }
              }
              ... on CommerceOrderRequiresAction {
                actionData {
                  clientSecret
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

  async handleSubmitError(error: { code: string; data: string | null }) {
    logger.error(error)
    switch (error.code) {
      case "missing_required_info": {
        this.props.dialog.showErrorDialog({
          title: "Missing information",
          message:
            "Please review and update your shipping and/or payment details and try again.",
        })
        break
      }
      case "insufficient_inventory": {
        await this.props.dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        const artistId = this.artistId()
        if (artistId) {
          this.routeToArtistPage()
        }
        break
      }
      case "failed_charge_authorize": {
        const parsedData = JSON.parse(error.data!)
        this.props.dialog.showErrorDialog({
          title: "An error occurred",
          message: parsedData.failure_message,
        })
        break
      }
      case "charge_authorization_failed": {
        let data = {} as any
        if (error.data) {
          data = JSON.parse(error.data)
        }

        if (data.decline_code === "insufficient_funds") {
          await this.props.dialog.showErrorDialog({
            title: "Insufficient funds",
            message:
              "There aren't enough funds available on the payment methods you provided. Please contact your card provider or try another card.",
          })
        } else {
          await this.props.dialog.showErrorDialog({
            title: "Charge failed",
            message:
              "Payment authorization has been declined. Please contact your card provider and try again.",
          })
        }
        break
      }
      case "payment_method_confirmation_failed": {
        await this.props.dialog.showErrorDialog({
          title: "Your card was declined",
          message:
            "We couldn't authorize your credit card. Please enter another payment method or contact your bank for more information.",
        })
        break
      }
      case "artwork_version_mismatch": {
        await this.props.dialog.showErrorDialog({
          title: "Work has been updated",
          message:
            "Something about the work changed since you started checkout. Please review the work before submitting your order.",
        })
        this.routeToArtworkPage()
        break
      }
      default: {
        logger.error(error)
        this.props.dialog.showErrorDialog()
        break
      }
    }
  }

  artistId() {
    return get(
      this.props.order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.artists?.[0]?.slug
    )
  }

  routeToArtworkPage() {
    const artworkId = get(
      this.props.order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.slug
    )
    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artwork/${artworkId}`)
  }

  routeToArtistPage() {
    const artistId = this.artistId()

    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }

  onChangeOffer = () => {
    this.props.router.push(`/orders/${this.props.order.internalID}/offer`)
  }

  onChangePayment = () => {
    this.props.router.push(`/orders/${this.props.order.internalID}/payment`)
  }

  onChangeShipping = () => {
    this.props.router.push(`/orders/${this.props.order.internalID}/shipping`)
  }

  render() {
    const { order, isCommittingMutation, isEigen } = this.props

    return (
      <Box data-test="orderReview">
        <OrderStepper
          currentStep="Review"
          steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
        />
        <TwoColumnLayout
          Content={
            <>
              <Join separator={<Spacer mb={4} />}>
                <Flex flexDirection="column" mb={[2, 4]}>
                  <Message p={[2, 4]} mb={[2, 4]}>
                    Disruptions caused by COVID-19 may cause delays — we
                    appreciate your understanding.
                    <Spacer mb={1} />
                    Please note that all offers are binding.
                  </Message>
                  {isEigen && (
                    <>
                      <Button
                        variant="primaryBlack"
                        width="100%"
                        loading={isCommittingMutation}
                        onClick={() => this.onSubmit()}
                      >
                        Submit
                      </Button>
                      <ConditionsOfSaleDisclaimer
                        paddingY={2}
                        textAlign="start"
                      />
                    </>
                  )}
                  {order.mode === "OFFER" && (
                    <OfferSummaryItem
                      order={order}
                      onChange={this.onChangeOffer}
                    />
                  )}
                  <ShippingSummaryItem
                    order={order}
                    onChange={this.onChangeShipping}
                  />
                  <CreditCardSummaryItem
                    order={order}
                    onChange={this.onChangePayment}
                    title="Payment method"
                  />
                  <ShippingArtaSummaryItemFragmentContainer
                    order={order}
                    onChange={this.onChangeShipping}
                    title="Shipping"
                  />
                </Flex>
                <Media greaterThan="xs">
                  <ItemReview lineItem={order?.lineItems?.edges?.[0]?.node!} />
                  <Spacer mb={2} />
                  <Button
                    variant="primaryBlack"
                    width="100%"
                    loading={isCommittingMutation}
                    onClick={() => this.onSubmit()}
                  >
                    Submit
                  </Button>
                  <Spacer mb={2} />
                  <ConditionsOfSaleDisclaimer textAlign="center" />
                </Media>
              </Join>
            </>
          }
          Sidebar={
            <Flex flexDirection="column">
              <Flex flexDirection="column">
                <ArtworkSummaryItem order={order} />
                <TransactionDetailsSummaryItem
                  order={order}
                  placeholderOverride="To be confirmed*"
                />
              </Flex>
              <BuyerGuarantee />
              {order.myLastOffer && !order.myLastOffer?.hasDefiniteTotal && (
                <Text variant="xs" color="black60">
                  *Shipping and taxes to be confirmed by gallery
                </Text>
              )}
              <Spacer mb={[2, 4]} />
              <Media at="xs">
                <Button
                  variant="primaryBlack"
                  width="100%"
                  loading={isCommittingMutation}
                  onClick={() => this.onSubmit()}
                >
                  Submit
                </Button>
                <Spacer mb={2} />
                <ConditionsOfSaleDisclaimer />
              </Media>
            </Flex>
          }
        />
      </Box>
    )
  }
}

export const ReviewFragmentContainer = createFragmentContainer(
  withSystemContext(
    createStripeWrapper(injectCommitMutation(injectDialog(ReviewRoute)) as any)
  ),
  {
    order: graphql`
      fragment Review_order on CommerceOrder {
        internalID
        mode
        itemsTotal(precision: 2)
        lineItems {
          edges {
            node {
              ...ItemReview_lineItem
              artwork {
                slug
                internalID
                artists {
                  slug
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          conversation {
            internalID
          }
          myLastOffer {
            hasDefiniteTotal
            internalID
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...ShippingSummaryItem_order
        ...CreditCardSummaryItem_order
        ...ShippingArtaSummaryItem_order
        ...OfferSummaryItem_order
      }
    `,
  }
)
