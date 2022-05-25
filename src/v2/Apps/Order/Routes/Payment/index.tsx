import { Payment_me } from "v2/__generated__/Payment_me.graphql"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { PaymentRouteSetOrderPaymentMutation } from "v2/__generated__/PaymentRouteSetOrderPaymentMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import {
  OrderStepper,
  buyNowFlowSteps,
  offerFlowSteps,
} from "v2/Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { Router } from "found"
import { createRef, FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { getClientParam } from "v2/Utils/getClientParam"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"

import { Box, Button, Flex, Spacer } from "@artsy/palette"
import { PaymentPicker } from "v2/Apps/Order/Components/PaymentPicker"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { SetPayment } from "../../Components/SetPayment"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { PaymentContent } from "./PaymentContent"

export const ContinueButton = props => (
  <Button variant="primaryBlack" width="100%" {...props}>
    Continue
  </Button>
)

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

export interface PaymentProps {
  order: Payment_order
  me: Payment_me
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

type Props = PaymentProps & StripeProps

const logger = createLogger("Order/Routes/Payment/index.tsx")

export const PaymentRoute: FC<Props> = props => {
  const [isGettingCreditCardId, setIsGettingCreditCardId] = useState(false)
  const { order, isCommittingMutation } = props
  const isLoading = isGettingCreditCardId || isCommittingMutation
  const paymentPicker = createRef<PaymentPicker>()

  const onContinue = async () => {
    try {
      setIsGettingCreditCardId(true)
      const result = await paymentPicker?.current?.getCreditCardId()
      setIsGettingCreditCardId(false)

      if (result?.type === "invalid_form") {
        return
      }

      if (result?.type === "error") {
        props.dialog.showErrorDialog({
          title: result.error,
          message:
            "Please enter another payment method or contact your bank for more information.",
        })
        return
      }

      if (result?.type === "internal_error") {
        props.dialog.showErrorDialog({
          title: "An internal error occurred",
        })
        logger.error(result.error)
        return
      }

      const orderOrError = (
        await setOrderPayment({
          input: {
            creditCardId: result?.creditCardId!,
            id: props.order.internalID!,
          },
        })
      ).commerceSetPayment?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      props.router.push(`/orders/${props.order.internalID}/review`)
    } catch (error) {
      logger.error(error)
      props.dialog.showErrorDialog()
    }
  }

  const onWireTransferContinue = () => {
    console.log("onWireTransferContinue")
    // TODO: set order payment with wire transfer when ready
  }

  const setOrderPayment = (
    variables: PaymentRouteSetOrderPaymentMutation["variables"]
  ) => {
    return props.commitMutation<PaymentRouteSetOrderPaymentMutation>({
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

  const setupIntentId = getClientParam("setup_intent")
  const isSettingPayment =
    setupIntentId &&
    getClientParam("setup_intent_client_secret") &&
    getClientParam("redirect_status") === "succeeded"

  const onSetPaymentSuccess = () => {
    props.router.push(`/orders/${props.order.internalID}/review`)
  }
  const onSetPaymentError = error => {
    logger.error(error)
    props.dialog.showErrorDialog()
  }

  return (
    <Box data-test="orderPayment">
      <OrderStepper
        currentStep="Payment"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
      />
      <TwoColumnLayout
        Content={
          <>
            {isSettingPayment && (
              <SetPayment
                order={order}
                setupIntentId={setupIntentId!}
                onSuccess={onSetPaymentSuccess}
                onError={onSetPaymentError}
              />
            )}
            <PaymentContent
              commitMutation={props.commitMutation}
              isLoading={isLoading}
              me={props.me}
              order={props.order}
              onContinue={onContinue}
              onWireTransferContinue={onWireTransferContinue}
              paymentPicker={paymentPicker}
            />
          </>
        }
        Sidebar={
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <ArtworkSummaryItem order={order} />
              <TransactionDetailsSummaryItem
                transactionStep="payment"
                order={order}
              />
            </Flex>
            <BuyerGuarantee
              contextModule={ContextModule.ordersPayment}
              contextPageOwnerType={OwnerType.ordersPayment}
            />
            <Spacer mb={[2, 4]} />
            <Media at="xs">
              <ContinueButton onClick={onContinue} loading={isLoading} />
            </Media>
          </Flex>
        }
      />
    </Box>
  )
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
        currencyCode
        buyerTotal(precision: 2)
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
