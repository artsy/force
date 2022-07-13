import { Payment_me } from "v2/__generated__/Payment_me.graphql"
import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "v2/__generated__/Payment_order.graphql"
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
import { CreditCardPicker } from "v2/Apps/Order/Components/CreditCardPicker"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { SetPaymentByStripeIntent } from "../../Components/SetPaymentByStripeIntent"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { PaymentContent } from "./PaymentContent"
import { useSetPayment } from "../../Components/Mutations/useSetPayment"
import { getInitialPaymentMethodValue } from "../../Utils/orderUtils"

export const ContinueButton = props => (
  <Button variant="primaryBlack" width={["100%", "50%"]} {...props}>
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
  const [isSetPaymentCommitting, setIsSetPaymentCommitting] = useState(false)
  const { order, isCommittingMutation } = props
  const isLoading =
    isGettingCreditCardId || isCommittingMutation || isSetPaymentCommitting
  const CreditCardPicker = createRef<CreditCardPicker>()
  const { submitMutation: setPaymentMutation } = useSetPayment()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    CommercePaymentMethodEnum
  >(getInitialPaymentMethodValue(order))

  const setPayment = () => {
    switch (selectedPaymentMethod) {
      case "CREDIT_CARD":
        onCreditCardContinue()
        break
      case "WIRE_TRANSFER":
        onWireTransferContinue()
        break
      default:
        break
    }
  }

  const onCreditCardContinue = async () => {
    try {
      setIsGettingCreditCardId(true)
      const result = await CreditCardPicker?.current?.getCreditCardId()
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
            paymentMethod: "CREDIT_CARD",
            paymentMethodId: result?.creditCardId,
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

  const onWireTransferContinue = async () => {
    try {
      setIsSetPaymentCommitting(true)

      const orderOrError = (
        await setPaymentMutation({
          variables: {
            input: {
              id: props.order.internalID,
              paymentMethod: "WIRE_TRANSFER",
            },
          },
        })
      ).commerceSetPayment?.orderOrError

      setIsSetPaymentCommitting(false)

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      onSetPaymentSuccess()
    } catch (error) {
      setIsSetPaymentCommitting(false)
      logger.error(error)
      onSetPaymentError(error)
    }
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
                  ...Payment_validation
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

  const saveAccount = getClientParam("save_account")
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
            {isSettingPayment ? (
              <SetPaymentByStripeIntent
                order={order}
                setupIntentId={setupIntentId!}
                saveAccount={saveAccount!}
                onSuccess={onSetPaymentSuccess}
                onError={onSetPaymentError}
              />
            ) : (
              <PaymentContent
                commitMutation={props.commitMutation}
                isLoading={isLoading}
                paymentMethod={selectedPaymentMethod}
                me={props.me}
                order={props.order}
                CreditCardPicker={CreditCardPicker}
                setPayment={setPayment}
                onPaymentMethodChange={setSelectedPaymentMethod}
                onSetPaymentSuccess={onSetPaymentSuccess}
                onSetPaymentError={onSetPaymentError}
              />
            )}
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
            {selectedPaymentMethod !== "US_BANK_ACCOUNT" && (
              <Media at="xs">
                <ContinueButton onClick={setPayment} loading={isLoading} />
              </Media>
            )}
          </Flex>
        }
      />
    </Box>
  )
}

graphql`
  fragment Payment_validation on CommerceOrder {
    paymentMethod
    paymentMethodDetails {
      __typename
      ... on CreditCard {
        id
      }
      ... on BankAccount {
        id
      }
      ... on WireTransfer {
        isManualPayment
      }
    }
  }
`

export const PaymentFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(PaymentRoute)),
  {
    me: graphql`
      fragment Payment_me on Me {
        ...CreditCardPicker_me
        ...BankAccountPicker_me
      }
    `,
    order: graphql`
      fragment Payment_order on CommerceOrder {
        availablePaymentMethods
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
        ...Payment_validation @relay(mask: false)
        ...CreditCardPicker_order
        ...BankAccountPicker_order
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
