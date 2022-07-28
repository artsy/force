// libs
import { createRef, FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { Router } from "found"
import { Box, Flex } from "@artsy/palette"
import { ContextModule, OwnerType } from "@artsy/cohesion"

// relay generated
import { Payment_me } from "__generated__/Payment_me.graphql"
import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "__generated__/Payment_order.graphql"

// utils, hooks, mutations and system tools
import { useSystemContext } from "System"
import { useFeatureFlag } from "System/useFeatureFlag"
import createLogger from "Utils/logger"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { getInitialPaymentMethodValue } from "Apps/Order/Utils/orderUtils"
import { useStripePaymentBySetupIntentId } from "Apps/Order/hooks/useStripePaymentBySetupIntentId"
import { SetOrderPayment } from "Apps/Order/Mutations/SetOrderPayment"

// components
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { CreditCardPicker } from "Apps/Order/Components/CreditCardPicker"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { PollAccountBalanceQueryRenderer } from "Apps/Order/Components/PollAccountBalance"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { ProcessingPayment } from "Apps/Order/Components/ProcessingPayment"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { PaymentContent } from "./PaymentContent"

const logger = createLogger("Order/Routes/Payment/index.tsx")

export interface PaymentRouteProps {
  order: Payment_order
  me: Payment_me
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
  stripe: Stripe
  elements: StripeElements
}

export const PaymentRoute: FC<PaymentRouteProps> = props => {
  const { order } = props
  const { relayEnvironment } = useSystemContext()
  const balanceCheckEnabled = useFeatureFlag("bank_account_balance_check")
  const CreditCardPicker = createRef<CreditCardPicker>()

  // user's selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    CommercePaymentMethodEnum
  >(getInitialPaymentMethodValue(order))

  /*
    state to render a loading interface while one of the following is happening:
    payment element is loading, confirming Stripe setup, and setting payment with CC, Wire or Saved bank account
  */
  const [isProcessingPayment, setIsProcessingPayment] = useState(true)

  /*
    hook to handle Stripe redirect for newly-linked bank account
    isProcessingRedirect indicates handling redirect and setting payment by SetupIntentId
  */
  const {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSetupSuccessful,
  } = useStripePaymentBySetupIntentId(order.internalID)

  // result of account balance check
  const [
    bankAccountHasInsufficientFunds,
    setBankAccountHasInsufficientFunds,
  ] = useState(false)

  // fired when save and continue is clicked for CC and Wire payment methods
  const setPayment = () => {
    setIsProcessingPayment(true)
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

  // sets payment with Credit Card
  const onCreditCardContinue = async () => {
    try {
      const result = await CreditCardPicker?.current?.getCreditCardId()

      if (result?.type === "invalid_form") return

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

      if (!relayEnvironment) return

      const error = (
        await SetOrderPayment(relayEnvironment, {
          paymentMethod: "CREDIT_CARD",
          paymentMethodId: result?.creditCardId,
          id: props.order.internalID!,
        })
      ).commerceSetPayment?.orderOrError?.error

      if (error) throw error
      props.router.push(`/orders/${props.order.internalID}/review`)
    } catch (error) {
      setIsProcessingPayment(false)
      logger.error(error)
      props.dialog.showErrorDialog()
    }
  }

  // sets payment with Wire Transfer
  const onWireTransferContinue = async () => {
    try {
      if (!relayEnvironment) return

      const error = (
        await SetOrderPayment(relayEnvironment, {
          id: props.order.internalID,
          paymentMethod: "WIRE_TRANSFER",
        })
      ).commerceSetPayment?.orderOrError?.error

      if (error) throw error
      props.router.push(`/orders/${props.order.internalID}/review`)
    } catch (error) {
      setIsProcessingPayment(false)
      logger.error(error)
      props.dialog.showErrorDialog()
    }
  }

  // sets payment with existing bank account
  const onBankAccountContinue = async (bankAccountId: string) => {
    setIsProcessingPayment(true)
    try {
      if (!relayEnvironment) return

      const error = (
        await SetOrderPayment(relayEnvironment, {
          id: order.internalID,
          paymentMethod: "US_BANK_ACCOUNT",
          paymentMethodId: bankAccountId,
        })
      ).commerceSetPayment?.orderOrError?.error

      if (error) throw error
      props.router.push(`/orders/${props.order.internalID}/review`)
    } catch (error) {
      setIsProcessingPayment(false)
      logger.error(error)
      props.dialog.showErrorDialog()
    }
  }

  // fired when balance check is done: either sets error state or moves to /review
  const onBalanceCheckComplete = (displayInsufficientFundsError: boolean) => {
    if (displayInsufficientFundsError) {
      setBankAccountHasInsufficientFunds(true)
      return
    }
    props.router.push(`/orders/${props.order.internalID}/review`)
  }

  const displayLoading = isProcessingRedirect || isProcessingPayment

  return (
    <Box data-test="orderPayment">
      <OrderRouteContainer
        currentStep="Payment"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
        content={
          balanceCheckEnabled && isPaymentSetupSuccessful ? (
            <PollAccountBalanceQueryRenderer
              setupIntentId={stripeSetupIntentId!}
              onBalanceCheckComplete={onBalanceCheckComplete}
              buyerTotalCents={order.buyerTotalCents!}
              orderCurrencyCode={order.currencyCode}
            />
          ) : (
            <>
              {displayLoading && <ProcessingPayment />}
              <Flex
                flexDirection="column"
                style={displayLoading ? { display: "none" } : {}}
              >
                <PaymentContent
                  commitMutation={props.commitMutation}
                  paymentMethod={selectedPaymentMethod}
                  me={props.me}
                  order={props.order}
                  CreditCardPicker={CreditCardPicker}
                  setPayment={setPayment}
                  onPaymentMethodChange={setSelectedPaymentMethod}
                  bankAccountHasInsufficientFunds={
                    bankAccountHasInsufficientFunds
                  }
                  setBankAccountHasInsufficientFunds={
                    setBankAccountHasInsufficientFunds
                  }
                  onBankAccountContinue={onBankAccountContinue}
                  setIsProcessingPayment={setIsProcessingPayment}
                />
              </Flex>
            </>
          )
        }
        sidebar={
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
            <SaveAndContinueButton
              media={{ at: "xs" }}
              onClick={setPayment}
              loading={isProcessingPayment}
            />
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
        buyerTotalCents
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
