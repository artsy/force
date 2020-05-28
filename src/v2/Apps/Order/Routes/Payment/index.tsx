import { Payment_me } from "v2/__generated__/Payment_me.graphql"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { PaymentRouteSetOrderPaymentMutation } from "v2/__generated__/PaymentRouteSetOrderPaymentMutation.graphql"

import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import {
  OrderStepper,
  buyNowFlowSteps,
  offerFlowSteps,
} from "v2/Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReactStripeElements } from "react-stripe-elements"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"

import { Button, Col, Flex, Row, Spacer, Box } from "@artsy/palette"
import {
  PaymentPicker,
  PaymentPickerFragmentContainer,
} from "v2/Apps/Order/Components/PaymentPicker"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { AnalyticsSchema, track } from "v2/Artsy"

export const ContinueButton = props => (
  <Button size="large" width="100%" {...props}>
    Continue
  </Button>
)

export interface PaymentProps extends ReactStripeElements.InjectedStripeProps {
  order: Payment_order
  me: Payment_me
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

interface PaymentState {
  isGettingCreditCardId: boolean
}

const logger = createLogger("Order/Routes/Payment/index.tsx")

@track((props: PaymentProps) => ({
  flow:
    props.order.mode === "BUY"
      ? AnalyticsSchema.Flow.BuyNow
      : AnalyticsSchema.Flow.MakeOffer,
}))
export class PaymentRoute extends Component<PaymentProps, PaymentState> {
  state: PaymentState = { isGettingCreditCardId: false }
  paymentPicker = React.createRef<PaymentPicker>()
  onContinue = async () => {
    try {
      this.setState({ isGettingCreditCardId: true })
      const result = await this.paymentPicker.current.getCreditCardId()
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
        await this.setOrderPayment({
          input: {
            creditCardId: result.creditCardId,
            id: this.props.order.internalID,
          },
        })
      ).commerceSetPayment.orderOrError

      if (orderOrError.error) {
        throw orderOrError.error
      }

      this.props.router.push(`/orders/${this.props.order.internalID}/review`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  render() {
    const { order, isCommittingMutation } = this.props
    const { isGettingCreditCardId } = this.state

    const isLoading = isGettingCreditCardId || isCommittingMutation

    return (
      <Box data-test="orderPayment">
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Payment"
                steps={
                  order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps
                }
              />
            </Col>
          </Row>
        </HorizontalPadding>

        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <Flex
                flexDirection="column"
                style={isLoading ? { pointerEvents: "none" } : {}}
              >
                <PaymentPickerFragmentContainer
                  commitMutation={this.props.commitMutation}
                  me={this.props.me}
                  order={this.props.order}
                  innerRef={this.paymentPicker}
                />
                <Spacer mb={3} />
                <Media greaterThan="xs">
                  <ContinueButton
                    onClick={this.onContinue}
                    loading={isLoading}
                  />
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <ArtworkSummaryItem order={order} />
                  <TransactionDetailsSummaryItem order={order} />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media at="xs">
                  <>
                    <Spacer mb={3} />
                    <ContinueButton
                      onClick={this.onContinue}
                      loading={isLoading}
                    />
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
      </Box>
    )
  }
  setOrderPayment(variables: PaymentRouteSetOrderPaymentMutation["variables"]) {
    return this.props.commitMutation<PaymentRouteSetOrderPaymentMutation>({
      variables,
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation PaymentRouteSetOrderPaymentMutation(
          $input: CommerceSetPaymentInput!
        ) {
          commerceSetPayment(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  id
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
}

export const PaymentFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(PaymentRoute)),
  {
    me: graphql`
      fragment Payment_me on Me {
        ...PaymentPicker_me
      }
    `,
    order: graphql`
      fragment Payment_order on CommerceOrder {
        internalID
        mode
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
            }
          }
        }
        ...PaymentPicker_order
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
