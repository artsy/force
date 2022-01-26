import { Button, Flex, Spacer } from "@artsy/palette"
import { Accept_order } from "v2/__generated__/Accept_order.graphql"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { track } from "v2/System/Analytics"
import { RouteConfig, Router } from "found"
import { Component } from "react"
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
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { AcceptRouteSetOrderPaymentMutation } from "v2/__generated__/AcceptRouteSetOrderPaymentMutation.graphql"
import { createStripeWrapper } from "v2/Utils/createStripeWrapper"
import { Stripe, StripeElements } from "@stripe/stripe-js"

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

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

@track()
export class Accept extends Component<AcceptProps & StripeProps> {
  acceptOffer() {
    return this.props.commitMutation<AcceptOfferMutation>({
      variables: {
        input: { offerId: this.props.order.lastOffer?.internalID },
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
        ?.orderOrError

      if (!orderOrError?.error) {
        this.props.router.push(`/orders/${this.props.order.internalID}/status`)
        return
      }

      if (orderOrError.error.code !== "payment_requires_action") {
        this.handleAcceptError(orderOrError?.error)
        return
      }

      const fixedOrderOrError = (
        await this.fixFailedPayment({
          input: {
            creditCardId: this.props.order.creditCardId!,
            offerId: this.props.order.lastOffer?.internalID!,
          },
        })
      ).commerceFixFailedPayment?.orderOrError!

      if (fixedOrderOrError.error) {
        this.handleAcceptError(orderOrError?.error)
        return
      }

      const scaResult = await this.props.stripe.handleCardAction(
        fixedOrderOrError.actionData?.clientSecret!
      )

      if (scaResult.error) {
        return this.props.dialog.showErrorDialog({
          title: "An error occurred",
          message: scaResult.error.message,
        })
      }

      this.onSubmit()
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  fixFailedPayment(variables: AcceptRouteSetOrderPaymentMutation["variables"]) {
    return this.props.commitMutation<AcceptRouteSetOrderPaymentMutation>({
      variables,
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation AcceptRouteSetOrderPaymentMutation(
          $input: CommerceFixFailedPaymentInput!
        ) {
          commerceFixFailedPayment(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  state
                  creditCard {
                    internalID
                    name
                    street1
                    street2
                    city
                    state
                    country
                    postal_code: postalCode
                  }
                  ... on CommerceOfferOrder {
                    awaitingResponseFrom
                  }
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

  async handleAcceptError(error: { code: string; data: string | null }) {
    logger.error(error)
    switch (error.code) {
      case "capture_failed": {
        const parsedData = get(error, e => JSON.parse(e.data!), {})

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
      o => o.lineItems?.edges?.[0]?.node?.artwork?.artists?.[0]?.slug
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
                <TransactionDetailsSummaryItem
                  order={order}
                  title="Accept seller's offer"
                  useLastSubmittedOffer={true}
                  onChange={this.onChangeResponse}
                />
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
              <Flex flexDirection="column">
                <Media greaterThan="xs">
                  {className => (
                    <ArtworkSummaryItem className={className} order={order} />
                  )}
                </Media>
                <ShippingSummaryItem order={order} locked />
                <CreditCardSummaryItem order={order} locked />
              </Flex>
              <BuyerGuarantee
                contextModule={ContextModule.ordersAccept}
                contextPageOwnerType={OwnerType.ordersAccept}
              />
              <Media greaterThan="xs">
                <Spacer mb={2} />
              </Media>
              <Media at="xs">
                <>
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
      </>
    )
  }
}

export const AcceptFragmentContainer = createFragmentContainer(
  createStripeWrapper(injectCommitMutation(injectDialog(Accept)) as any),
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
        creditCardId
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
