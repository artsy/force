import { NewPayment_me } from "__generated__/NewPayment_me.graphql"
import { NewPayment_order } from "__generated__/NewPayment_order.graphql"
import { NewPaymentRouteSetOrderPaymentMutation } from "__generated__/NewPaymentRouteSetOrderPaymentMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { track } from "react-tracking"
import { CountdownTimer } from "Components/CountdownTimer"
import { RouteConfig, Router } from "found"
import { createRef, Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

import { Button, Flex, Join, Spacer } from "@artsy/palette"
import {
  CreditCardPicker,
  CreditCardPickerFragmentContainer,
} from "Apps/Order/Components/CreditCardPicker"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { get } from "Utils/get"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { createStripeWrapper } from "Utils/createStripeWrapper"
import { ContextModule, OwnerType } from "@artsy/cohesion"

export const ContinueButton = props => (
  <Button variant="primaryBlack" width={["100%", "50%"]} {...props}>
    Continue
  </Button>
)

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

export interface NewPaymentProps {
  order: NewPayment_order
  me: NewPayment_me
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

interface NewPaymentState {
  isGettingCreditCardId: boolean
}

const logger = createLogger("Order/Routes/NewPayment/index.tsx")

@track()
export class NewPaymentRoute extends Component<
  NewPaymentProps & StripeProps,
  NewPaymentState
> {
  CreditCardPicker = createRef<CreditCardPicker>()
  state = {
    isGettingCreditCardId: false,
  }

  onContinue = async () => {
    try {
      this.setState({ isGettingCreditCardId: true })
      const result = await this.CreditCardPicker?.current?.getCreditCardId()!
      this.setState({ isGettingCreditCardId: false })

      if (result.type === "invalid_form") {
        return
      }

      if (result.type === "error") {
        this.props.dialog.showErrorDialog({
          title: result.error,
          message:
            "Please enter another payment method or contact your bank for more information.",
        })
        return
      }

      if (result.type === "internal_error") {
        this.props.dialog.showErrorDialog({
          title: "An internal error occurred",
        })
        logger.error(result.error)
        return
      }

      const orderOrError = (
        await this.fixFailedPayment({
          input: {
            creditCardId: result.creditCardId,
            offerId: this.props.order.lastOffer?.internalID,
            orderId: this.props.order.internalID,
          },
        })
      ).commerceFixFailedPayment?.orderOrError!

      if (orderOrError.error) {
        this.handleFixFailedPaymentError(orderOrError.error.code)
        return
      } else if (
        orderOrError.actionData &&
        orderOrError.actionData.clientSecret
      ) {
        const scaResult = await this.props.stripe.handleCardAction(
          orderOrError.actionData.clientSecret
        )
        if (scaResult.error) {
          this.props.dialog.showErrorDialog({
            title: "An error occurred",
            message: scaResult.error.message,
          })
          return
        } else {
          this.onContinue()
        }
      } else {
        this.props.router.push(`/orders/${this.props.order.internalID}/status`)
      }

      this.props.router.push(`/orders/${this.props.order.internalID}/status`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  render() {
    const { order, isCommittingMutation } = this.props
    const { isGettingCreditCardId } = this.state

    const isLoading = isCommittingMutation || isGettingCreditCardId

    return (
      <>
        <OrderStepper currentStep="Payment" steps={["Payment"]} />

        <TwoColumnLayout
          Content={
            <Flex
              flexDirection="column"
              style={isLoading ? { pointerEvents: "none" } : {}}
            >
              {order.mode === "OFFER" && (
                <>
                  <Flex>
                    <CountdownTimer
                      action="Submit new payment"
                      note="Expiration will end negotiations on this offer. Keep in mind the work can be sold to another buyer in the meantime."
                      countdownStart={order.lastOffer?.createdAt!}
                      countdownEnd={order.stateExpiresAt!}
                    />
                  </Flex>
                  <Spacer mb={[2, 4]} />
                </>
              )}
              <Join separator={<Spacer mb={4} />}>
                <CreditCardPickerFragmentContainer
                  order={order}
                  me={this.props.me}
                  commitMutation={this.props.commitMutation}
                  innerRef={this.CreditCardPicker}
                />
                <Media greaterThan="xs">
                  <ContinueButton
                    onClick={this.onContinue}
                    loading={isLoading}
                  />
                </Media>
              </Join>
            </Flex>
          }
          Sidebar={
            <Flex flexDirection="column">
              <Flex flexDirection="column">
                <ArtworkSummaryItem order={order} />
                <TransactionDetailsSummaryItem order={order} />
              </Flex>
              <BuyerGuarantee
                contextModule={ContextModule.ordersNewPayment}
                contextPageOwnerType={OwnerType.ordersNewPayment}
              />
              <Spacer mb={[2, 4]} />
              <Media at="xs">
                <>
                  <ContinueButton
                    onClick={this.onContinue}
                    loading={isLoading}
                  />
                </>
              </Media>
            </Flex>
          }
        />
      </>
    )
  }

  fixFailedPayment(
    variables: NewPaymentRouteSetOrderPaymentMutation["variables"]
  ) {
    return this.props.commitMutation<NewPaymentRouteSetOrderPaymentMutation>({
      variables,
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation NewPaymentRouteSetOrderPaymentMutation(
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

  async handleFixFailedPaymentError(code: string) {
    switch (code) {
      case "capture_failed": {
        this.props.dialog.showErrorDialog({
          title: "Charge failed",
          message:
            "Payment has been declined. Please contact your card provider or bank institution, then press “Continue” again. Alternatively, use another payment method.",
        })
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
      default: {
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

  routeToArtistPage() {
    const artistId = this.artistId()

    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }
}

export const NewPaymentFragmentContainer = createFragmentContainer(
  createStripeWrapper<NewPaymentProps>(
    injectCommitMutation(injectDialog(NewPaymentRoute)) as any
  ),
  {
    me: graphql`
      fragment NewPayment_me on Me {
        ...CreditCardPicker_me
      }
    `,
    order: graphql`
      fragment NewPayment_order on CommerceOrder {
        internalID
        mode
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
            createdAt
            internalID
            note
          }
        }
        ...CreditCardPicker_order
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
