import { createRef, FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { Router } from "found"
import { Box, Flex } from "@artsy/palette"
import { ContextModule, OwnerType } from "@artsy/cohesion"

import { Payment_me } from "__generated__/Payment_me.graphql"
import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "__generated__/Payment_order.graphql"

import createLogger from "Utils/logger"
import { useSystemContext } from "System"
import { useFeatureFlag } from "System/useFeatureFlag"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  OrderStepper,
  buyNowFlowSteps,
  offerFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { CreditCardPicker } from "Apps/Order/Components/CreditCardPicker"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { PollAccountBalanceQueryRenderer } from "Apps/Order/Components/PollAccountBalance"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { SetPaymentByStripeIntent } from "Apps/Order/Components/SetPaymentByStripeIntent"
import { ProcessingPayment } from "Apps/Order/Components/ProcessingPayment"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"
import { SetOrderPayment } from "Apps/Order/Mutations/SetOrderPayment"
import { useStripeRedirect } from "Apps/Order/hooks/useStripeRedirect"
import { getInitialPaymentMethodValue } from "Apps/Order/Utils/orderUtils"

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
  const {
    isProcessingRedirect,
    stripeSetupIntentId,
    shouldSaveBankAccount,
  } = useStripeRedirect()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    CommercePaymentMethodEnum
  >(getInitialPaymentMethodValue(order))

  const CreditCardPicker = createRef<CreditCardPicker>()

  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [isPaymentSetupComplete, setIsPaymentSetupComplete] = useState(false)
  const [shouldPollAccountBalance, setShouldPollAccountBalance] = useState(
    false
  )
  const [
    bankAccountHasInsufficientFunds,
    setBankAccountHasInsufficientFunds,
  ] = useState(false)

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

  const onCreditCardContinue = async () => {
    try {
      const result = await CreditCardPicker?.current?.getCreditCardId()

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

      if (!relayEnvironment) return

      const orderOrError = (
        await SetOrderPayment(relayEnvironment, {
          paymentMethod: "CREDIT_CARD",
          paymentMethodId: result?.creditCardId,
          id: props.order.internalID!,
        })
      ).commerceSetPayment?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      props.router.push(`/orders/${props.order.internalID}/review`)
    } catch (error) {
      logger.error(error)
      props.dialog.showErrorDialog()
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const onWireTransferContinue = async () => {
    try {
      if (!relayEnvironment) return

      const orderOrError = (
        await SetOrderPayment(relayEnvironment, {
          id: props.order.internalID,
          paymentMethod: "WIRE_TRANSFER",
        })
      ).commerceSetPayment?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      onSetPaymentSuccess()
    } catch (error) {
      logger.error(error)
      onSetPaymentError(error)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const onBankAccountContinue = async (bankAccountId: string) => {
    try {
      if (!relayEnvironment) return

      const orderOrError = (
        await SetOrderPayment(relayEnvironment, {
          id: order.internalID,
          paymentMethod: "US_BANK_ACCOUNT",
          paymentMethodId: bankAccountId,
        })
      ).commerceSetPayment?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      onSetPaymentSuccess()
    } catch (error) {
      onSetPaymentError(error)
    }
  }

  const onSetPaymentSuccess = () => {
    if (balanceCheckEnabled && stripeSetupIntentId) {
      setShouldPollAccountBalance(true)
      setIsPaymentSetupComplete(true)
      return
    }

    props.router.push(`/orders/${props.order.internalID}/review`)
  }

  const onSetPaymentError = error => {
    logger.error(error)
    props.dialog.showErrorDialog()
  }

  const onBalanceCheckComplete = (displayInsufficientFundsError: boolean) => {
    if (displayInsufficientFundsError) {
      setShouldPollAccountBalance(false)
      setBankAccountHasInsufficientFunds(true)
      return
    }

    props.router.push(`/orders/${props.order.internalID}/review`)
  }

  let content: React.ReactNode = (
    <PaymentContent
      commitMutation={props.commitMutation}
      paymentMethod={selectedPaymentMethod}
      me={props.me}
      order={props.order}
      CreditCardPicker={CreditCardPicker}
      setPayment={setPayment}
      onPaymentMethodChange={setSelectedPaymentMethod}
      bankAccountHasInsufficientFunds={bankAccountHasInsufficientFunds}
      setBankAccountHasInsufficientFunds={setBankAccountHasInsufficientFunds}
      onBankAccountContinue={onBankAccountContinue}
      isProcessingPayment={isProcessingPayment}
    />
  )

  if (isProcessingRedirect || isProcessingPayment) {
    content = <ProcessingPayment />
  }

  if (stripeSetupIntentId && !isPaymentSetupComplete) {
    content = (
      <SetPaymentByStripeIntent
        order={order}
        setupIntentId={stripeSetupIntentId!}
        shouldSaveBankAccount={shouldSaveBankAccount}
        onSuccess={onSetPaymentSuccess}
        onError={onSetPaymentError}
      />
    )
  }

  if (shouldPollAccountBalance && stripeSetupIntentId) {
    content = (
      <PollAccountBalanceQueryRenderer
        setupIntentId={stripeSetupIntentId!}
        onBalanceCheckComplete={onBalanceCheckComplete}
        buyerTotalCents={order.buyerTotalCents!}
        orderCurrencyCode={order.currencyCode}
      />
    )
  }

  return (
    <Box data-test="orderPayment">
      <OrderStepper
        currentStep="Payment"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
      />
      <TwoColumnLayout
        Content={content}
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
