// libs
import { createRef, FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Stripe, StripeElements, StripeError } from "@stripe/stripe-js"
import { Router } from "found"
import { Box, Flex, Spacer } from "@artsy/palette"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"

// relay generated
import { Payment_me$data } from "__generated__/Payment_me.graphql"
import { Payment_order$data } from "__generated__/Payment_order.graphql"
import { PaymentRouteSetOrderPaymentMutation } from "__generated__/PaymentRouteSetOrderPaymentMutation.graphql"

// utils, hooks, mutations and system tools
import { extractNodes } from "Utils/extractNodes"
import { useRouter } from "System/Hooks/useRouter"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import createLogger from "Utils/logger"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { getInitialPaymentMethodValue } from "Apps/Order/Utils/orderUtils"
import { useStripePaymentBySetupIntentId } from "Apps/Order/Hooks/useStripePaymentBySetupIntentId"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import { useOrderPaymentContext } from "./PaymentContext/OrderPaymentContext"

// components
import { PartnerOfferTimerItem } from "Apps/Order/Components/PartnerOfferTimerItem"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { AdditionalArtworkDetailsFragmentContainer as AdditionalArtworkDetails } from "Apps/Order/Components/AdditionalArtworkDetails"
import {
  buyNowFlowSteps,
  privateFlowSteps,
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
import { useJump } from "Utils/Hooks/useJump"

const logger = createLogger("Order/Routes/Payment/index.tsx")

export interface PaymentRouteProps {
  order: Payment_order$data
  me: Payment_me$data
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
    bankAccountHasInsufficientFunds,
    setBankAccountSelection,
    setSelectedPaymentMethod,
    setBalanceCheckComplete,
    setBankAccountHasInsufficientFunds,
    setIsSavingPayment,
  } = useOrderPaymentContext()

  const balanceCheckEnabled =
    useFeatureFlag("bank_account_balance_check") &&
    selectedPaymentMethod === "US_BANK_ACCOUNT"

  const artworkVersion = extractNodes(order.lineItems)[0]?.artworkVersion

  const { jumpTo } = useJump()

  useEffect(() => {
    const bankAccountsArray =
      selectedPaymentMethod !== "SEPA_DEBIT"
        ? extractNodes(me.bankAccounts)
        : []

    const bankAccountOnOrder = bankAccountsArray.find(
      bank => bank.internalID === order.bankAccountId
    )

    if (bankAccountOnOrder?.internalID) {
      setBankAccountSelection({
        type: "existing",
        id: bankAccountOnOrder.internalID,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  useEffect(() => {
    setSelectedPaymentMethod(getInitialPaymentMethodValue(order))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  /*
    hook to handle Stripe redirect for newly-linked bank account
    isProcessingRedirect indicates handling redirect and setting payment by SetupIntentId
  */
  const {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSetupSuccessful,
    paymentSetupError,
  } = useStripePaymentBySetupIntentId(order.internalID)

  // SavingPaymentSpinner is rendered and PaymentContent is hidden when true
  const displayLoading =
    isProcessingRedirect ||
    isSavingPayment ||
    (!!match?.location?.query?.setup_intent &&
      !bankAccountHasInsufficientFunds &&
      !paymentSetupError)

  let routeSteps
  if (order.mode === "OFFER") {
    routeSteps = offerFlowSteps
  } else {
    if (order.source === "private_sale") {
      routeSteps = privateFlowSteps
    } else {
      routeSteps = buyNowFlowSteps
    }
  }

  // fired when an error is encountered during selecting bank account, polling balance, or setting payment
  const handlePaymentError = (error: Error | StripeError) => {
    const errorContent = {
      ...error,
      orderId: props.order.internalID!,
      selectedPaymentMethod,
      bankAccountHasInsufficientFunds,
      shouldLogErrorToSentry: true,
    }

    logger.error(errorContent)
  }

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
    setIsSavingPayment(false)
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

      if (result?.type === "invalid_form") {
        jumpTo("paymentDetailsTop", { behavior: "smooth" })
        return
      }
      if (result?.type === "error") {
        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersPayment,
          context_owner_id: props.order.internalID,
          title: result.error,
          message:
            "Please enter another payment method or contact your bank for more information.",
          error_code: null,
          flow: "user sets credit card as payment method",
        })

        props.dialog.showErrorDialog({
          title: result.error,
          message:
            "Please enter another payment method or contact your bank for more information.",
        })
        return
      }

      if (result?.type === "internal_error") {
        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersPayment,
          context_owner_id: props.order.internalID,
          title: "An internal error occurred",
          message:
            "Something went wrong. Please try again or contact orders@artsy.net",
          error_code: null,
          flow: "user sets credit card as payment method",
        })

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

      handlePaymentStepComplete()
    } catch (error) {
      setIsSavingPayment(false)
      handlePaymentError(error)

      let errorCode = error.code || ""

      /**
       * Our tracking events show that many users are still seeing the generic
       * error message when they attempt to submit this step. However, we are
       * not receiving any error codes with these tracking events, so it has
       * been difficult to further investigate them.
       *
       * This is an attempt to serialize the errors that lead users to this
       * code path so that we can better understand what is happening.
       */
      if (errorCode === "") {
        try {
          errorCode = error.toString()
        } catch (e) {
          // do nothing
        }
      }

      trackEvent({
        action: ActionType.errorMessageViewed,
        context_owner_type: OwnerType.ordersPayment,
        context_owner_id: props.order.internalID,
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        error_code: errorCode,
        flow: "user sets credit card as payment method",
      })

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

      handlePaymentStepComplete()
    } catch (error) {
      handlePaymentError(error)
      setIsSavingPayment(false)

      trackEvent({
        action: ActionType.errorMessageViewed,
        context_owner_type: OwnerType.ordersPayment,
        context_owner_id: props.order.internalID,
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        error_code: null,
        flow: "user sets wire transfer as payment method",
      })

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

  // show error modal when payment setup error is set
  useEffect(() => {
    if (paymentSetupError) {
      let title = "An error occurred"
      let message =
        "Something went wrong. Please try again or contact orders@artsy.net"
      let width: undefined | number = undefined

      const errorCode = (paymentSetupError as any).code

      if (errorCode === "unsupported_sepa_country") {
        title = "Choose another payment method"
        message =
          "The bank account you entered is not denominated in EUR. Please select another payment method and try again."
        width = 500
      }

      trackEvent({
        action: ActionType.errorMessageViewed,
        context_owner_type: OwnerType.ordersPayment,
        context_owner_id: props.order.internalID,
        title: title,
        message: message,
        error_code: errorCode,
        flow: "user sets payment by setup intent",
      })

      props.dialog.showErrorDialog({
        title,
        message,
        width,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentSetupError])

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
        order={order}
        currentStep="Payment"
        steps={routeSteps}
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
              onError={handlePaymentError}
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
                  onError={handlePaymentError}
                />
              </Flex>
            </>
          )
        }
        sidebar={
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              {order.source === "partner_offer" && order.mode === "BUY" && (
                <>
                  <PartnerOfferTimerItem order={order} />
                  <Spacer y={2} />
                </>
              )}
              <ArtworkSummaryItem order={order} />
              <TransactionDetailsSummaryItem
                transactionStep="payment"
                order={order}
              />
              {order.source === "private_sale" &&
                (order.artworkDetails ||
                  artworkVersion?.provenance ||
                  artworkVersion?.condition_description) && (
                  <AdditionalArtworkDetails order={order} />
                )}
              <BuyerGuarantee
                contextModule={ContextModule.ordersPayment}
                contextPageOwnerType={OwnerType.ordersPayment}
                orderSource={order.source}
                renderArtsyPrivateSaleConditions={true}
                privateSaleConditions={order.conditionsOfSale}
              />
            </Flex>

            {selectedPaymentMethod !== "US_BANK_ACCOUNT" && (
              <>
                <Spacer y={4} />
                <SaveAndContinueButton
                  media={{ at: "xs" }}
                  onClick={handleSetPayment}
                  loading={isSavingPayment}
                />
                <Spacer y={2} />
              </>
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
        artworkDetails
        source
        conditionsOfSale
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
              artworkVersion {
                provenance
                condition_description
              }
            }
          }
        }
        ...Payment_validation @relay(mask: false)
        ...CreditCardPicker_order
        ...BankAccountPicker_order
        ...PartnerOfferTimerItem_order
        ...ArtworkSummaryItem_order
        ...AdditionalArtworkDetails_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order
      }
    `,
  }
)
