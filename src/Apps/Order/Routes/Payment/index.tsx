// libs
import { createRef, FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { Router } from "found"
import { Box, Flex, Spacer } from "@artsy/palette"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"

// relay generated
import { Payment_me } from "__generated__/Payment_me.graphql"
import { Payment_order } from "__generated__/Payment_order.graphql"
import { PaymentRouteSetOrderPaymentMutation } from "__generated__/PaymentRouteSetOrderPaymentMutation.graphql"

// utils, hooks, mutations and system tools
import { extractNodes } from "Utils/extractNodes"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import createLogger from "Utils/logger"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import {
  getInitialPaymentMethodValue,
  getInitialBankAccountSelection,
} from "Apps/Order/Utils/orderUtils"
import { useStripePaymentBySetupIntentId } from "Apps/Order/Hooks/useStripePaymentBySetupIntentId"
import { useSetPayment } from "../../Mutations/useSetPayment"
import {
  useOrderPaymentContext,
  OrderPaymentContextProvider,
} from "./PaymentContext/OrderPaymentContext"

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
import { SavingPaymentSpinner } from "Apps/Order/Components/SavingPaymentSpinner"
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

export enum BalanceCheckResult {
  success = "success",
  failed = "failed",
  check_not_possible = "check not possible",
}

export type BankAccountSelectionType = "existing" | "new"

export interface BankAccountSelection {
  type: BankAccountSelectionType
  id?: string
}

export const PaymentRoute: FC<PaymentRouteProps> = props => {
  return (
    <OrderPaymentContextProvider>
      <PaymentRouteContent {...props} />
    </OrderPaymentContextProvider>
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
        bankAccounts(first: 100) {
          edges {
            node {
              internalID
              last4
            }
          }
        }
        ...CreditCardPicker_me
        ...BankAccountPicker_me
      }
    `,
    order: graphql`
      fragment Payment_order on CommerceOrder {
        bankAccountId
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

export const PaymentRouteContent: FC<PaymentRouteProps> = props => {
  const { order, me } = props
  const { trackEvent } = useTracking()
  const { match } = useRouter()
  const { submitMutation: setPaymentMutation } = useSetPayment()

  const CreditCardPicker = createRef<CreditCardPicker>()

  const {
    selectedBankAccountId,
    selectedPaymentMethod,
    balanceCheckComplete,
    isSavingPayment,
    setBankAccountSelection,
    setSelectedPaymentMethod,
    setBalanceCheckComplete,
    setBankAccountHasInsufficientFunds,
    setIsSavingPayment,
  } = useOrderPaymentContext()

  const balanceCheckEnabled =
    useFeatureFlag("bank_account_balance_check") &&
    selectedPaymentMethod === "US_BANK_ACCOUNT"

  useEffect(() => {
    const bankAccountsArray =
      selectedPaymentMethod === "US_BANK_ACCOUNT"
        ? extractNodes(me.bankAccounts)
        : []

    setBankAccountSelection(
      getInitialBankAccountSelection(order, bankAccountsArray)
    )
    setSelectedPaymentMethod(getInitialPaymentMethodValue(order))
    setIsSavingPayment(!!match?.location?.query?.setup_intent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
    hook to handle Stripe redirect for newly-linked bank account
    isProcessingRedirect indicates handling redirect and setting payment by SetupIntentId
  */
  const {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSetupSuccessful,
  } = useStripePaymentBySetupIntentId(order.internalID)

  // SavingPaymentSpinner is rendered and PaymentContent is hidden when true
  const displayLoading = isProcessingRedirect || isSavingPayment

  // fired when balance check is done: either sets error state or moves to /review
  const handleBalanceCheckComplete = (
    displayInsufficientFundsError: boolean,
    checkResult: BalanceCheckResult
  ) => {
    const event = {
      subject: "balance_account_check",
      outcome: checkResult,
      payment_method: selectedPaymentMethod,
      currency: order.currencyCode,
      amount: order.buyerTotalCents,
      order_id: order.internalID,
      context_page_owner_type: OwnerType.ordersPayment,
      action: ActionType.checkedAccountBalance,
      flow: order.mode!,
    }

    trackEvent(event)

    setBalanceCheckComplete(true)
    setIsSavingPayment(false)

    if (displayInsufficientFundsError) {
      setBankAccountHasInsufficientFunds(true)
      return
    }

    handlePaymentStepComplete()
  }

  const handlePaymentStepComplete = () => {
    props.router.push(`/orders/${props.order.internalID}/review`)
  }

  // fired when save and continue is clicked for CC and Wire payment methods
  const handleSetPayment = () => {
    switch (selectedPaymentMethod) {
      case "CREDIT_CARD":
        handleCreditCardContinue()
        break
      case "WIRE_TRANSFER":
        handleWireTransferContinue()
        break
      default:
        break
    }
  }

  // sets payment with Credit Card
  const handleCreditCardContinue = async () => {
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

      setIsSavingPayment(true)

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
        setIsSavingPayment(false)
        throw orderOrError.error
      }

      props.router.push(`/orders/${props.order.internalID}/review`)
    } catch (error) {
      setIsSavingPayment(false)
      logger.error(error)
      props.dialog.showErrorDialog()
    }
  }

  // sets payment with Wire Transfer
  const handleWireTransferContinue = async () => {
    setIsSavingPayment(true)
    try {
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

      if (orderOrError?.error) throw orderOrError.error
      props.router.push(`/orders/${props.order.internalID}/review`)
    } catch (error) {
      setIsSavingPayment(false)
      logger.error(error)
      props.dialog.showErrorDialog()
    }
  }

  // complete payment when balance check is disabled and bank account is set
  useEffect(() => {
    if (
      !balanceCheckEnabled &&
      (selectedBankAccountId || isPaymentSetupSuccessful) &&
      (selectedPaymentMethod === "US_BANK_ACCOUNT" ||
        selectedPaymentMethod === "SEPA_DEBIT")
    ) {
      handlePaymentStepComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPaymentSetupSuccessful,
    selectedBankAccountId,
    balanceCheckEnabled,
    selectedPaymentMethod,
  ])

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

  return (
    <Box data-test="orderPayment">
      <OrderRouteContainer
        currentStep="Payment"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
        content={
          balanceCheckEnabled &&
          (isPaymentSetupSuccessful || selectedBankAccountId) &&
          !balanceCheckComplete ? (
            <PollAccountBalanceQueryRenderer
              setupIntentId={stripeSetupIntentId!}
              bankAccountId={selectedBankAccountId}
              onBalanceCheckComplete={handleBalanceCheckComplete}
              buyerTotalCents={order.buyerTotalCents!}
              orderCurrencyCode={order.currencyCode}
            />
          ) : (
            <>
              {displayLoading && <SavingPaymentSpinner />}
              {/* keep PaymentContent mounted but displayed none while 
                  displayLoading is true; needed to handle Stripe redirect */}
              <Flex
                flexDirection="column"
                style={displayLoading ? { display: "none" } : {}}
              >
                <PaymentContent
                  commitMutation={props.commitMutation}
                  me={props.me}
                  order={props.order}
                  CreditCardPicker={CreditCardPicker}
                  onSetPayment={handleSetPayment}
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

            {selectedPaymentMethod !== "US_BANK_ACCOUNT" && (
              <>
                <Spacer mt={4} />
                <SaveAndContinueButton
                  media={{ at: "xs" }}
                  onClick={handleSetPayment}
                  loading={isSavingPayment}
                />
                <Spacer mb={2} />
              </>
            )}
          </Flex>
        }
      />
    </Box>
  )
}
