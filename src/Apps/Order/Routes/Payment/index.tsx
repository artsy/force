// libs
import { createRef, FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { Router } from "found"
import { Box, Flex, Spacer } from "@artsy/palette"
import { ContextModule, OwnerType } from "@artsy/cohesion"

// relay generated
import { Payment_me } from "__generated__/Payment_me.graphql"
import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "__generated__/Payment_order.graphql"
import { PaymentRouteSetOrderPaymentMutation } from "__generated__/PaymentRouteSetOrderPaymentMutation.graphql"

// utils, hooks, mutations and system tools
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import createLogger from "Utils/logger"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { getInitialPaymentMethodValue } from "Apps/Order/Utils/orderUtils"
import { useStripePaymentBySetupIntentId } from "Apps/Order/Hooks/useStripePaymentBySetupIntentId"
import { useSetPayment } from "../../Mutations/useSetPayment"

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

export const PaymentRoute: FC<PaymentRouteProps> = props => {
  const { order } = props
  const { match } = useRouter()
  const balanceCheckEnabled = useFeatureFlag("bank_account_balance_check")
  const CreditCardPicker = createRef<CreditCardPicker>()
  const { submitMutation: setPaymentMutation } = useSetPayment()

  // user's selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    CommercePaymentMethodEnum
  >(getInitialPaymentMethodValue(order))

  /*
    state to render a loading interface while one of the following is happening:
    payment element is loading, confirming Stripe setup, and setting payment with CC, Wire or Saved bank account
  */
  const [isSavingPayment, setIsSavingPayment] = useState(
    !!match?.location?.query?.setup_intent
  )

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

  // an existing bank account's ID, used to query account balance
  const [selectedBankAccountId, setSelectedBankAccountId] = useState("")

  // whether balance check is performed for the current bank account
  const [balanceCheckComplete, setBalanceCheckComplete] = useState(false)

  // result of account balance check
  const [
    bankAccountHasInsufficientFunds,
    setBankAccountHasInsufficientFunds,
  ] = useState(false)

  // fired when save and continue is clicked for CC and Wire payment methods
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
  const onWireTransferContinue = async () => {
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

  // fired when balance check is done: either sets error state or moves to /review
  const onBalanceCheckComplete = (displayInsufficientFundsError: boolean) => {
    setBalanceCheckComplete(true)
    setIsSavingPayment(false)
    setSelectedBankAccountId("")

    if (displayInsufficientFundsError) {
      setBankAccountHasInsufficientFunds(true)
      return
    }

    props.router.push(`/orders/${props.order.internalID}/review`)
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

  return (
    <Box data-test="orderPayment">
      <OrderRouteContainer
        currentStep="Payment"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
        content={
          balanceCheckEnabled &&
          (!balanceCheckComplete || selectedBankAccountId) &&
          isPaymentSetupSuccessful ? (
            <PollAccountBalanceQueryRenderer
              setupIntentId={stripeSetupIntentId!}
              bankAccountId={selectedBankAccountId}
              onBalanceCheckComplete={onBalanceCheckComplete}
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
                  setIsSavingPayment={setIsSavingPayment}
                  setSelectedBankAccountId={setSelectedBankAccountId}
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
                  onClick={setPayment}
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
