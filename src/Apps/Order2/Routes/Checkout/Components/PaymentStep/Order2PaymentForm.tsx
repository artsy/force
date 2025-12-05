import { ContextModule } from "@artsy/cohesion"
import { Button, Spacer, Text, useTheme } from "@artsy/palette"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  StripeElementsOptions,
  StripePaymentElementChangeEvent,
  StripePaymentElementOptions,
} from "@stripe/stripe-js"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import {
  CheckoutErrorBanner,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
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
import { useEffect, useState } from "react"
import { graphql, useFragment, useRelayEnvironment } from "react-relay"
import { data as sd } from "sharify"
import { SavedPaymentMethodOption } from "./SavedPaymentMethodOption"
import { StripePaymentCheckboxes } from "./StripePaymentCheckboxes"
import { WireTransferOption } from "./WireTransferOption"

const logger = createLogger("Order2PaymentForm")
const defaultErrorMessage = (
  <>
    Something went wrong. Please try again or contact <MailtoOrderSupport />.
  </>
)

const defaultBillingAddress = {
  ...emptyAddress,
  country: "US",
}

const getTotalForPayment = (
  orderData: Order2PaymentForm_order$data,
): { minor: number; currencyCode: string } | null => {
  const { mode, itemsTotal, pendingOffer } = orderData

  if (mode === "BUY" && itemsTotal) {
    return itemsTotal
  }

  if (mode === "OFFER") {
    const totalLine = pendingOffer?.pricingBreakdownLines?.find(
      line => line?.amount?.amount != null,
    )

    if (totalLine?.amount?.amount) {
      return {
        minor: Math.round(Number.parseFloat(totalLine.amount.amount) * 100),
        currencyCode: totalLine.amount.currencyCode,
      }
    }
  }

  return null
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
  const { seller } = orderData

  const totalForPayment = getTotalForPayment(orderData)

  if (!totalForPayment) {
    return null
  }

  const { theme } = useTheme()

  const options: StripeElementsOptions = {
    mode: "payment",
    paymentMethodOptions: {
      us_bank_account: {
        verification_method: "instant",
        financial_connections: {
          permissions: ["payment_method", "balances", "ownership"],
          // @ts-ignore Stripe type issue
          prefetch: ["balances"],
        },
      },
    },
    appearance: {
      variables: {
        accordionItemSpacing: "10px",
        fontFamily: theme.fonts.sans,
        colorPrimary: theme.colors.mono100, // accordion is selected
        colorTextSecondary: theme.colors.mono100, // accordion is not selected
      },
      rules: {
        ".AccordionItem": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "normal",
          border: "none",
          backgroundColor: theme.colors.mono5,
        },
        ".AccordionItem--selected": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "1px solid #E7E7E7", // mono10
        },
      },
    },
    amount: totalForPayment.minor,
    currency: totalForPayment.currencyCode.toLowerCase(),
    onBehalfOf: seller?.merchantAccount?.externalId,
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
  // TODO: Update from legacy commerceSetPayment mutation
  const legacySetPaymentMutation = useSetPayment()

  const {
    setConfirmationToken,
    checkoutTracking,
    setSavedPaymentMethod,
    setPaymentComplete,
    setSavePaymentMethod,
    savePaymentMethod,
    activeFulfillmentDetailsTab,
  } = useCheckoutContext()

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
  const [errorMessage, setErrorMessage] = useState<JSX.Element | string | null>(
    null,
  )
  const [subtitleErrorMessage, setSubtitleErrorMessage] = useState<
    string | null
  >(null)
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

  // Default to saved payment method when available and track that it has been viewed
  useEffect(() => {
    if (
      !selectedPaymentMethod &&
      (hasSavedCreditCards || hasSavedBankAccounts)
    ) {
      setSelectedPaymentMethod("saved")

      const savedPaymentTypes = [
        hasSavedCreditCards && "CREDIT_CARD",
        hasSavedBankAccounts && "BANK_ACCOUNT",
      ].filter(Boolean) as string[]

      checkoutTracking.savedPaymentMethodViewed(savedPaymentTypes)
    }
  }, [
    hasSavedCreditCards,
    hasSavedBankAccounts,
    selectedPaymentMethod,
    checkoutTracking,
  ])

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

    setSelectedPaymentMethod(methodType)
  }

  const onClickSavedPaymentMethods = () => {
    trackPaymentMethodSelection("SAVED_CREDIT_CARD")
    setErrorMessage(null)
    setSelectedPaymentMethod("saved")
    elements?.getElement("payment")?.collapse()
  }

  const onClickWirePaymentMethods = () => {
    trackPaymentMethodSelection("WIRE_TRANSFER")
    setErrorMessage(null)
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

  const needsBillingAddress = () => {
    if (selectedPaymentMethod !== "stripe-card") return false
    if (activeFulfillmentDetailsTab === "PICKUP") return true
    return !billingAddressSameAsShipping
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

  const handleError = (error: { message?: string | JSX.Element }) => {
    setErrorMessage(error.message || defaultErrorMessage)
    setIsSubmittingToStripe(false)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!selectedPaymentMethod) {
      setSubtitleErrorMessage("Select a payment method")
      return
    }

    if (needsBillingAddress()) {
      const billingAddr = getBillingAddress()
      if (!billingAddr.name || !billingAddr.addressLine1 || !billingAddr.city) {
        setSubtitleErrorMessage(
          "Please fill in required billing address fields",
        )
        return
      }
    }

    checkoutTracking.clickedOrderProgression(ContextModule.ordersPayment)

    if (isSelectedPaymentMethodStripe) {
      setIsSubmittingToStripe(true)

      if (selectedPaymentMethod === "stripe-card") {
        elements.update({
          captureMethod: "manual",
          setupFutureUsage: "off_session",
          mode: "payment",
          // @ts-ignore Stripe type issue
          paymentMethodOptions: null,
        })
      }

      if (
        selectedPaymentMethod === "stripe-ach" ||
        selectedPaymentMethod === "stripe-sepa"
      ) {
        const paymentMethodTypes = {
          "stripe-ach": ["us_bank_account"],
          "stripe-sepa": ["sepa_debit"],
        }[selectedPaymentMethod]

        elements.update({
          captureMethod: "automatic",
          setupFutureUsage: null,
          mode: "setup",
          payment_method_types: paymentMethodTypes,
        })
      }

      const { error: submitError } = await elements.submit()

      if (submitError) {
        logger.error(submitError)
        handleError(submitError)
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
        logger.error(error)
        handleError(error)
        return
      }

      const response = await fetchAndSetConfirmationToken(
        confirmationToken.id,
        environment,
        setConfirmationToken,
      )

      setSavePaymentMethod(savePaymentMethod)

      if (!response) {
        handleError({ message: defaultErrorMessage })
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
          updateOrderPaymentMethodResult.updateOrder?.orderOrError,
        )
      } catch (error) {
        logger.error("Error while updating order payment method", error)
        handleError({ message: defaultErrorMessage })
      } finally {
        setPaymentComplete()
        setIsSubmittingToStripe(false)
      }
    }

    if (selectedPaymentMethod === "wire") {
      setIsSubmittingToStripe(true)

      try {
        const result = await legacySetPaymentMutation.submitMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: "WIRE_TRANSFER",
            },
          },
        })

        if (
          result?.commerceSetPayment?.orderOrError?.error ||
          !result?.commerceSetPayment?.orderOrError?.order
        ) {
          throw (
            result?.commerceSetPayment?.orderOrError.error ||
            new Error("Failed to set payment method")
          )
        }
      } catch (error) {
        logger.error("Error while updating order payment method", error)
        handleError({ message: defaultErrorMessage })
      } finally {
        setIsSubmittingToStripe(false)
        // Resets for the PaymentCompletedView
        setSavedPaymentMethod({ savedPaymentMethod: null })
        setConfirmationToken({ confirmationToken: null })
        setPaymentComplete()
      }
    }

    if (selectedPaymentMethod === "saved") {
      if (!selectedSavedPaymentMethod) {
        setSubtitleErrorMessage("Select a saved payment method")
        return
      }

      setIsSubmittingToStripe(true)

      try {
        const paymentMethod = getPaymentMethodFromSavedPayment(
          selectedSavedPaymentMethod,
        )
        const result = await legacySetPaymentMutation.submitMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: paymentMethod,
              paymentMethodId: selectedSavedPaymentMethod?.internalID,
              // Note: paymentMethodId is not supported in updateOrder mutation
              // Saved credit card functionality may need a different approach
            },
          },
        })

        if (
          result?.commerceSetPayment?.orderOrError?.error ||
          !result?.commerceSetPayment?.orderOrError?.order
        ) {
          throw (
            result?.commerceSetPayment?.orderOrError.error ||
            new Error("Failed to set payment method")
          )
        }
      } catch (error) {
        logger.error("Error while updating order payment method", error)
        handleError({ message: defaultErrorMessage })
      } finally {
        setIsSubmittingToStripe(false)
        setSavedPaymentMethod({
          savedPaymentMethod: selectedSavedPaymentMethod,
        })
        setPaymentComplete()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {subtitleErrorMessage && !selectedPaymentMethod && (
        <Text variant="xs" color="red100" mb={2}>
          {subtitleErrorMessage}
        </Text>
      )}

      {/* Stripe error messages are displayed within the Payment Element, so we don't need to handle them here. */}
      {errorMessage && !isSelectedPaymentMethodStripe && (
        <>
          <Spacer y={2} />
          <CheckoutErrorBanner error={{ message: errorMessage }} />
          <Spacer y={2} />
        </>
      )}

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

      <PaymentElement options={paymentElementOptions} onChange={onChange} />

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
      />

      <Spacer y={2} />
      {/* Stripe error messages are displayed within the Payment Element, so we don't need to handle them here. */}
      {errorMessage && !isSelectedPaymentMethodStripe && (
        <>
          <CheckoutErrorBanner error={{ message: errorMessage }} />
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
    pendingOffer {
      pricingBreakdownLines {
        ... on TotalLine {
          amount {
            amount
            currencyCode
          }
        }
      }
    }
    itemsTotal {
      minor
      currencyCode
    }
    buyerTotal {
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
