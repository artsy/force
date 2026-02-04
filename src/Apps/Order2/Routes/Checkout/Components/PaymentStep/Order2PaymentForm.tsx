import { ContextModule } from "@artsy/cohesion"
import { Button, Spacer, useTheme } from "@artsy/palette"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  StripeElementsOptions,
  StripeError,
  StripePaymentElementChangeEvent,
  StripePaymentElementOptions,
} from "@stripe/stripe-js"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import {
  BankAccountBalanceCheckResult,
  Order2PollBankAccountBalanceQueryRenderer,
} from "Apps/Order2/Components/Order2PollBankAccountBalance"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  type CheckoutErrorBannerMessage,
  somethingWentWrongError,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToErrorBanner } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToErrorBanner"
import { useOrder2SetOrderPaymentMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderPaymentMutation"
import { fetchAndSetConfirmationToken } from "Apps/Order2/Utils/confirmationTokenUtils"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { type Address, emptyAddress } from "Components/Address/utils"
import { extractNodes } from "Utils/extractNodes"
import createLogger from "Utils/logger"
import type {
  Order2PaymentForm_me$data,
  Order2PaymentForm_me$key,
} from "__generated__/Order2PaymentForm_me.graphql"
import type {
  Order2PaymentForm_order$data,
  Order2PaymentForm_order$key,
} from "__generated__/Order2PaymentForm_order.graphql"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { graphql, useFragment, useRelayEnvironment } from "react-relay"
import { data as sd } from "sharify"
import { SavedPaymentMethodOption } from "./SavedPaymentMethodOption"
import { StripePaymentCheckboxes } from "./StripePaymentCheckboxes"
import { WireTransferOption } from "./WireTransferOption"

const logger = createLogger("Order2PaymentForm")

const PAYMENT_ERROR_MESSAGES: Record<string, CheckoutErrorBannerMessage> = {
  noPaymentMethodSelected: {
    title: "Payment method required",
    message: "Select a payment method",
  },
  noSavedPaymentMethodSelected: {
    title: "Payment method required",
    message: "Select a saved payment method",
  },
  insufficientFunds: {
    title: "Insufficient funds",
    message: "Update payment details or choose an alternative payment method",
  },
}

const defaultBillingAddress = {
  ...emptyAddress,
  country: "US",
}

const getTotalForPayment = (
  orderData: Order2PaymentForm_order$data,
): { minor?: number; currencyCode: string } | null => {
  const { mode, itemsTotal, currencyCode } = orderData

  if (mode === "BUY" && itemsTotal && itemsTotal.minor) {
    return itemsTotal
  }

  if (mode === "OFFER") {
    return {
      currencyCode: currencyCode,
    }
  }

  return null
}

const getBaseStripeOptions = (
  mode: Order2PaymentForm_order$data["mode"],
  total: { minor?: number; currencyCode: string },
  merchantAccountExternalId: string | undefined,
  availablePaymentMethodTypes?: ReadonlyArray<string> | null,
) => {
  const sharedOptions = {
    currency: total.currencyCode.toLowerCase(),
    setupFutureUsage: "off_session" as const,
    captureMethod: "automatic" as const,
    paymentMethodOptions: {
      us_bank_account: {
        verification_method: "instant" as const,
        financial_connections: {
          permissions: ["payment_method", "balances", "ownership"] as Array<
            "payment_method" | "balances" | "ownership"
          >,
          // @ts-ignore Stripe type issue
          prefetch: ["balances"],
        },
      },
    },
    onBehalfOf: merchantAccountExternalId,
    paymentMethodTypes: availablePaymentMethodTypes as string[],
  }

  return mode === "BUY"
    ? {
        ...sharedOptions,
        mode: "payment" as const,
        amount: total.minor,
      }
    : {
        ...sharedOptions,
        mode: "setup" as const,
      }
}

interface Order2PaymentFormProps {
  order: Order2PaymentForm_order$key
  me: Order2PaymentForm_me$key
}

export const Order2PaymentForm: React.FC<Order2PaymentFormProps> = ({
  order,
  me,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  const stripe = useStripe()
  const { seller, mode, availableStripePaymentMethodTypes } = orderData

  const total = getTotalForPayment(orderData)

  if (!total) {
    return null
  }

  const { theme } = useTheme()

  const baseOptions = getBaseStripeOptions(
    mode,
    total,
    seller?.merchantAccount?.externalId,
    availableStripePaymentMethodTypes,
  )

  const options: StripeElementsOptions = {
    ...baseOptions,
    appearance: {
      variables: {
        // https://docs.stripe.com/elements/appearance-api#variables
        accordionItemSpacing: "10px",
        fontFamily: theme.fonts.sans,
        colorPrimary: theme.colors.mono100, // Accordian selected.
        colorTextSecondary: theme.colors.mono60, // Accordian not selected.
      },
      rules: {
        ".AccordionItem": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "normal",
          border: "1px solid transparent",
          backgroundColor: theme.colors.mono5,
        },
        ".AccordionItem--selected": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "bold",
          border: `1px solid ${theme.colors.mono10}`,
        },
        ".AccordionItem:hover": {
          color: "var(--colorPrimary)",
        },
        ".Label": {
          color: "var(--colorPrimary)",
        },
      },
    },
  }

  return (
    <Elements stripe={stripe} options={options}>
      <PaymentFormContent order={orderData} me={meData} />
    </Elements>
  )
}

interface PaymentFormContentProps {
  order: Order2PaymentForm_order$data
  me: Order2PaymentForm_me$data
}
const PaymentFormContent: React.FC<PaymentFormContentProps> = ({
  order,
  me,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const environment = useRelayEnvironment()
  const setPaymentMutation = useOrder2SetOrderPaymentMutation()

  const {
    setConfirmationToken,
    checkoutTracking,
    setPaymentComplete,
    setSavePaymentMethod,
    savePaymentMethod,
    activeFulfillmentDetailsTab,
    messages,
    setStepErrorMessage,
    steps,
  } = useCheckoutContext()

  const paymentError = messages[CheckoutStepName.PAYMENT]?.error
  const paymentStep = steps.find(step => step.name === CheckoutStepName.PAYMENT)

  const unsetStepError = () => {
    setStepErrorMessage({
      step: CheckoutStepName.PAYMENT,
      error: null,
    })
  }

  const trackPaymentMethodSelection = (
    paymentMethod:
      | "CREDIT_CARD"
      | "SAVED_CREDIT_CARD"
      | "WIRE_TRANSFER"
      | "US_BANK_ACCOUNT"
      | "SEPA_DEBIT",
  ) => {
    checkoutTracking.clickedPaymentMethod({
      paymentMethod,
      amountMinor: order.itemsTotal?.minor,
      currency: order.itemsTotal?.currencyCode ?? "",
    })
  }

  const [isSubmittingToStripe, setIsSubmittingToStripe] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    null | "saved" | "stripe-card" | "wire" | "stripe-ach" | "stripe-sepa"
  >(null)
  const [selectedSavedPaymentMethod, setSelectedSavedPaymentMethod] = useState<
    any | null
  >(null)
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] =
    useState(true)
  const [billingFormValues, setBillingFormValues] =
    useState<FormikContextWithAddress>(() => ({
      address: defaultBillingAddress,
    }))
  const [isCheckingBankBalance, setIsCheckingBankBalance] = useState(false)

  const isSelectedPaymentMethodStripe = selectedPaymentMethod?.match(/^stripe/)
  const savedCreditCards = extractNodes(me.creditCards)
  const hasSavedCreditCards = savedCreditCards.length > 0
  const savedBankAccounts = extractNodes(me.bankAccounts)
  const allowedSavedBankAccounts = savedBankAccounts.filter(bankAccount =>
    order.availablePaymentMethods?.includes(bankAccount.type),
  )
  const hasSavedBankAccounts = allowedSavedBankAccounts.length > 0
  const [wireEmailSubject, setWireEmailSubject] = useState<string | null>(null)
  const [wireEmailBody, setWireEmailBody] = useState<string | null>(null)
  const merchantAccountExternalId = order.seller?.merchantAccount?.externalId

  const paymentElementRef = useRef<HTMLDivElement>(null)
  const errorBannerRef = useScrollToErrorBanner(CheckoutStepName.PAYMENT)
  const billingFormRef = useRef<any>(null)

  // Default to saved payment method when available and track that it has been viewed
  useEffect(() => {
    if (!checkoutTracking || paymentStep?.state !== CheckoutStepState.ACTIVE) {
      return
    }

    if (
      !selectedPaymentMethod &&
      (hasSavedCreditCards || hasSavedBankAccounts)
    ) {
      setSelectedPaymentMethod("saved")

      const savedPaymentTypes = [
        hasSavedCreditCards && "CREDIT_CARD",
        hasSavedBankAccounts && "BANK_ACCOUNT",
      ].filter(Boolean) as string[]

      const paymentMethodIds = [
        ...savedCreditCards.map(card => card.internalID),
        ...allowedSavedBankAccounts.map(bank => bank.internalID),
      ]

      checkoutTracking.savedPaymentMethodViewed(
        savedPaymentTypes,
        paymentMethodIds,
      )
    }
  }, [
    hasSavedCreditCards,
    hasSavedBankAccounts,
    selectedPaymentMethod,
    checkoutTracking,
    paymentStep?.state,
    savedCreditCards,
    allowedSavedBankAccounts,
  ])

  const resetElementsToInitialParams = useCallback(() => {
    if (!elements) return

    const total = getTotalForPayment(order)
    if (!total) return

    const { mode, availableStripePaymentMethodTypes } = order

    const options = getBaseStripeOptions(
      mode,
      total,
      merchantAccountExternalId,
      availableStripePaymentMethodTypes,
    )

    elements.update(options)
  }, [elements, merchantAccountExternalId, order])

  const handleError = useCallback(
    (error?: CheckoutErrorBannerMessage) => {
      setStepErrorMessage({
        step: CheckoutStepName.PAYMENT,
        error,
      })

      setIsSubmittingToStripe(false)
      resetElementsToInitialParams()
    },
    [resetElementsToInitialParams, setStepErrorMessage],
  )

  const handlePaymentElementError = useCallback(
    // do not setStepErrorMessage since the error is being handled by the PaymentElement
    (error: StripeError) => {
      paymentElementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      setIsSubmittingToStripe(false)
      resetElementsToInitialParams()
    },
    [resetElementsToInitialParams],
  )

  const handleBalanceCheckComplete = useCallback(
    async (result: BankAccountBalanceCheckResult) => {
      setIsCheckingBankBalance(false)

      switch (result) {
        // We only want to block the checkout when we know there is insufficient funds.
        case BankAccountBalanceCheckResult.INSUFFICIENT:
          handleError(PAYMENT_ERROR_MESSAGES.insufficientFunds)
          break
        default:
          setPaymentComplete()
          setIsSubmittingToStripe(false)
          resetElementsToInitialParams()
          break
      }
    },
    [handleError, setPaymentComplete, resetElementsToInitialParams],
  )

  const handleBalanceCheckError = useCallback(
    (error: Error) => {
      logger.error("Error during balance check:", error)
      setIsCheckingBankBalance(false)
      // On error, proceed with checkout anyway
      setPaymentComplete()
      setIsSubmittingToStripe(false)
      resetElementsToInitialParams()
    },
    [setPaymentComplete, resetElementsToInitialParams],
  )

  if (!(stripe && elements)) {
    return null
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
      spacedAccordionItems: true,
      defaultCollapsed: true,
      radios: false,
    },
    wallets: {
      applePay: "never",
      googlePay: "never",
    },
    business: { name: "Artsy" },
  }

  const onChange = (event: StripePaymentElementChangeEvent) => {
    const { elementType, collapsed, value } = event
    logger.warn("PaymentElement onChange event", { event })

    if (elementType !== "payment" || collapsed) {
      return
    }

    switch (value.type) {
      case "card":
        handleCardPaymentSelect()
        break
      case "sepa_debit":
        handleBankDebitSelect("sepa_debit", "stripe-sepa")
        break
      case "us_bank_account":
        handleBankDebitSelect("us_bank_account", "stripe-ach")
        break
    }
  }

  const handleCardPaymentSelect = () => {
    if (selectedPaymentMethod !== "stripe-card") {
      trackPaymentMethodSelection("CREDIT_CARD")
    }
    unsetStepError()
    setSelectedPaymentMethod("stripe-card")
  }

  const handleBankDebitSelect = (
    paymentType: "sepa_debit" | "us_bank_account",
    methodType: "stripe-sepa" | "stripe-ach",
  ) => {
    if (selectedPaymentMethod !== methodType) {
      const trackingMethod =
        paymentType === "sepa_debit" ? "SEPA_DEBIT" : "US_BANK_ACCOUNT"
      trackPaymentMethodSelection(trackingMethod)
    }
    unsetStepError()
    setSelectedPaymentMethod(methodType)
  }

  const onClickSavedPaymentMethods = () => {
    trackPaymentMethodSelection("SAVED_CREDIT_CARD")
    unsetStepError()
    setSelectedPaymentMethod("saved")
    elements?.getElement("payment")?.collapse()
  }

  const onClickWirePaymentMethods = () => {
    trackPaymentMethodSelection("WIRE_TRANSFER")
    unsetStepError()
    setSelectedPaymentMethod("wire")
    setWireEmailSubject(`Wire transfer inquiry (CODE #${order.code})`)
    const artworkInfo =
      order.lineItems[0]?.artwork?.artworkMeta?.share?.slice(10) // Removing "Check out " from the share metadata
    const artworkUrl = sd.APP_URL + order.lineItems[0]?.artwork?.href
    setWireEmailBody(
      `Hello%2C%0D%0AI'm interested in paying by wire transfer and would like some assistance.%0D%0A${artworkInfo} on Artsy: ${artworkUrl}`,
    )
    elements?.getElement("payment")?.collapse()
  }

  const getBillingAddress = (): Address => {
    // For pickup orders, always use the billing form values
    if (activeFulfillmentDetailsTab === "PICKUP") {
      return billingFormValues.address
    }

    // For shipping orders, use shipping address if same as shipping is selected
    if (billingAddressSameAsShipping && order.fulfillmentDetails) {
      return {
        name: order.fulfillmentDetails.name ?? "",
        addressLine1: order.fulfillmentDetails.addressLine1 ?? "",
        addressLine2: order.fulfillmentDetails.addressLine2 ?? "",
        city: order.fulfillmentDetails.city ?? "",
        region: order.fulfillmentDetails.region ?? "",
        postalCode: order.fulfillmentDetails.postalCode ?? "",
        country: order.fulfillmentDetails.country ?? "",
      }
    }

    return billingFormValues.address
  }

  const handleBillingAddressSameAsShippingChange = (selected: boolean) => {
    setBillingAddressSameAsShipping(selected)
    if (!selected) {
      setBillingFormValues({
        address: defaultBillingAddress,
      })
    }
  }

  const getPaymentMethodFromSavedPayment = (savedPaymentMethod: any) => {
    if (savedPaymentMethod?.__typename === "CreditCard") {
      return "CREDIT_CARD"
    }
    if (savedPaymentMethod?.type === "US_BANK_ACCOUNT") {
      return "US_BANK_ACCOUNT"
    }
    if (savedPaymentMethod?.type === "SEPA_DEBIT") {
      return "SEPA_DEBIT"
    }
    throw new Error(
      "Could not determine mutation payment method from saved payment method chosen.",
    )
  }

  const handleSubmit = async event => {
    event.preventDefault()

    // Clear any previous error messages
    unsetStepError()

    // Validate billing form if it's rendered
    if (billingFormRef.current) {
      const errors = await billingFormRef.current.validateForm()

      if (Object.keys(errors).length > 0) {
        await billingFormRef.current.submitForm()
        return
      }
    }

    if (!selectedPaymentMethod) {
      handleError(PAYMENT_ERROR_MESSAGES.noPaymentMethodSelected)
      return
    }

    checkoutTracking.clickedOrderProgression(ContextModule.ordersPayment)

    if (isSelectedPaymentMethodStripe) {
      setIsSubmittingToStripe(true)

      if (selectedPaymentMethod === "stripe-card") {
        elements.update({
          captureMethod: "manual",
          // @ts-ignore Stripe type issue
          paymentMethodOptions: null,
        })
      } else if (selectedPaymentMethod === "stripe-ach") {
        elements.update({
          setupFutureUsage: null,
          mode: "setup",
          paymentMethodTypes: ["us_bank_account"],
          // @ts-ignore Stripe type issue
          onBehalfOf: null,
        })
      } else if (selectedPaymentMethod === "stripe-sepa") {
        elements.update({
          setupFutureUsage: null,
          mode: "setup",
          paymentMethodTypes: ["sepa_debit"],
        })
      }

      const { error: submitError } = await elements.submit()

      if (submitError) {
        handlePaymentElementError(submitError)
        return
      }

      const billingAddress = getBillingAddress()
      const { error, confirmationToken } = await stripe.createConfirmationToken(
        {
          elements,
          ...(selectedPaymentMethod === "stripe-card" && {
            params: {
              payment_method_data: {
                billing_details: {
                  name: billingAddress.name,
                  address: {
                    line1: billingAddress.addressLine1,
                    line2: billingAddress.addressLine2,
                    city: billingAddress.city,
                    state: billingAddress.region,
                    postal_code: billingAddress.postalCode,
                    country: billingAddress.country,
                  },
                },
              },
            },
          }),
        },
      )

      if (error) {
        handleError(
          somethingWentWrongError("selecting your payment method", error.code),
        )
        return
      }

      const response = await fetchAndSetConfirmationToken(
        confirmationToken.id,
        environment,
        setConfirmationToken,
      )

      setSavePaymentMethod(savePaymentMethod)

      if (!response) {
        handleError(
          somethingWentWrongError(
            "selecting your payment method",
            "confirmation_token_fetch_failed",
          ),
        )
        return
      }

      const paymentMethod = {
        "stripe-card": "CREDIT_CARD",
        "stripe-ach": "US_BANK_ACCOUNT",
        "stripe-sepa": "SEPA_DEBIT",
      }[selectedPaymentMethod]

      try {
        const updateOrderPaymentMethodResult =
          await setPaymentMutation.submitMutation({
            variables: {
              input: {
                id: order.internalID,
                paymentMethod: paymentMethod,
                stripeConfirmationToken: confirmationToken.id,
              },
            },
          })

        validateAndExtractOrderResponse(
          updateOrderPaymentMethodResult.setOrderPayment?.orderOrError,
        )

        // For ACH debit, start balance check
        if (paymentMethod === "US_BANK_ACCOUNT") {
          setIsCheckingBankBalance(true)
          // Keep submitting state active during balance check
          // The balance check handlers will call setPaymentComplete() and setIsSubmittingToStripe(false)
          return
        }

        // For other payment methods, complete immediately
        setPaymentComplete()
        setIsSubmittingToStripe(false)
        resetElementsToInitialParams()
      } catch (error) {
        handleError(
          somethingWentWrongError("selecting your payment method", error.code),
        )
        logger.error(
          "Error while submitting order with new stripe payment method",
          error,
        )
        return
      }
    }

    if (selectedPaymentMethod === "wire") {
      setIsSubmittingToStripe(true)

      try {
        const result = await setPaymentMutation.submitMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: "WIRE_TRANSFER",
            },
          },
        })

        validateAndExtractOrderResponse(result.setOrderPayment?.orderOrError)
      } catch (error) {
        handleError(
          somethingWentWrongError("selecting your payment method", error.code),
        )
        logger.error(
          "Error while submitting order with wire trasnfer payment method",
          error,
        )
        return
      } finally {
        setIsSubmittingToStripe(false)
        resetElementsToInitialParams()
        setConfirmationToken({ confirmationToken: null })
        setPaymentComplete()
      }
    }

    if (selectedPaymentMethod === "saved") {
      if (!selectedSavedPaymentMethod) {
        handleError(PAYMENT_ERROR_MESSAGES.noSavedPaymentMethodSelected)
        return
      }

      setIsSubmittingToStripe(true)

      try {
        const paymentMethod = getPaymentMethodFromSavedPayment(
          selectedSavedPaymentMethod,
        )
        const result = await setPaymentMutation.submitMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: paymentMethod,
              paymentMethodId: selectedSavedPaymentMethod?.internalID,
            },
          },
        })

        validateAndExtractOrderResponse(result.setOrderPayment?.orderOrError)

        setConfirmationToken({ confirmationToken: null })

        // For saved ACH bank accounts, start balance check
        if (paymentMethod === "US_BANK_ACCOUNT") {
          setIsCheckingBankBalance(true)
          // Keep submitting state active during balance check
          // The balance check handlers will call setPaymentComplete() and setIsSubmittingToStripe(false)
          return
        }

        // For other saved payment methods, complete immediately
        setIsSubmittingToStripe(false)
        resetElementsToInitialParams()
        setPaymentComplete()
      } catch (error) {
        handleError(
          somethingWentWrongError("selecting your payment method", error.code),
        )
        logger.error(
          "Error while submitting order with saved payment method",
          error,
        )

        return
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Spacer y={2} />

      {(hasSavedCreditCards || hasSavedBankAccounts) && (
        <SavedPaymentMethodOption
          me={me}
          isSelected={selectedPaymentMethod === "saved"}
          selectedSavedPaymentMethod={selectedSavedPaymentMethod}
          allowedSavedBankAccounts={allowedSavedBankAccounts}
          onSelect={onClickSavedPaymentMethods}
          onSavedPaymentMethodSelect={setSelectedSavedPaymentMethod}
        />
      )}

      <div ref={paymentElementRef}>
        <PaymentElement options={paymentElementOptions} onChange={onChange} />
      </div>

      <Spacer y={1} />

      {order.availablePaymentMethods?.includes("WIRE_TRANSFER") && (
        <WireTransferOption
          isSelected={selectedPaymentMethod === "wire"}
          wireEmailSubject={wireEmailSubject}
          wireEmailBody={wireEmailBody}
          onSelect={onClickWirePaymentMethods}
        />
      )}

      <Spacer y={1} />

      <StripePaymentCheckboxes
        selectedPaymentMethod={selectedPaymentMethod}
        savePaymentMethod={savePaymentMethod}
        activeFulfillmentDetailsTab={activeFulfillmentDetailsTab}
        billingAddressSameAsShipping={billingAddressSameAsShipping}
        billingFormValues={billingFormValues}
        onSavePaymentMethodChange={setSavePaymentMethod}
        onBillingAddressSameAsShippingChange={
          handleBillingAddressSameAsShippingChange
        }
        onBillingFormValuesChange={setBillingFormValues}
        billingFormRef={billingFormRef}
      />

      <Spacer y={2} />

      {isCheckingBankBalance && (
        <Order2PollBankAccountBalanceQueryRenderer
          orderId={order.internalID}
          onBalanceCheckComplete={handleBalanceCheckComplete}
          onError={handleBalanceCheckError}
        />
      )}

      {paymentError && (
        <>
          <CheckoutErrorBanner
            ref={errorBannerRef}
            error={paymentError}
            analytics={{ flow: "User setting payment" }}
          />
          <Spacer y={4} />
        </>
      )}

      <Button
        loading={isSubmittingToStripe}
        variant="primaryBlack"
        width="100%"
        type="submit"
      >
        Continue to Review
      </Button>
    </form>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2PaymentForm_me on Me {
    creditCards(first: 10) {
      edges {
        node {
          __typename
          internalID
          brand
          lastDigits
          expirationYear
          expirationMonth
        }
      }
    }
    bankAccounts(first: 10) {
      edges {
        node {
          __typename
          type
          internalID
          last4
          bankName
        }
      }
    }
  }
`

const ORDER_FRAGMENT = graphql`
  fragment Order2PaymentForm_order on Order {
    code
    mode
    source
    internalID
    currencyCode
    availablePaymentMethods
    availableStripePaymentMethodTypes
    bankAccountBalanceCheck {
      result
      message
    }
    itemsTotal {
      minor
      currencyCode
    }
    seller {
      ... on Partner {
        merchantAccount {
          externalId
        }
      }
    }
    fulfillmentDetails {
      name
      addressLine1
      addressLine2
      city
      region
      postalCode
      country
    }
    lineItems {
      artwork {
        href
        artworkMeta: meta {
          share
        }
      }
    }
  }
`
