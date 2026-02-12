import { Box, Spacer, Text } from "@artsy/palette"
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  AvailablePaymentMethods,
  ClickResolveDetails,
  ExpressPaymentType,
  LineItem,
  ShippingRate,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementOptions,
  StripeExpressCheckoutElementShippingAddressChangeEvent,
  StripeExpressCheckoutElementShippingRateChangeEvent,
} from "@stripe/stripe-js"
import {
  type OrderMutationSuccess,
  validateAndExtractOrderResponse,
} from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import type { ExpressCheckoutPaymentMethod } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  type CheckoutErrorBannerMessage,
  MailtoOrderSupport,
  ORDER_SUPPORT_EMAIL,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { fetchAndSetConfirmationToken } from "Apps/Order2/Utils/confirmationTokenUtils"
import { LocalCheckoutError } from "Apps/Order2/Utils/errors"
import { preventHardReload } from "Apps/Order2/Utils/navigationGuards"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import type {
  Order2ExpressCheckoutUI_order$data,
  Order2ExpressCheckoutUI_order$key,
} from "__generated__/Order2ExpressCheckoutUI_order.graphql"
import type {
  FulfillmentOptionInputEnum,
  useOrder2ExpressCheckoutSetFulfillmentOptionMutation$data,
} from "__generated__/useOrder2ExpressCheckoutSetFulfillmentOptionMutation.graphql"
import type { OrderCreditCardWalletTypeEnum } from "__generated__/useOrder2ExpressCheckoutSetOrderPaymentMutation.graphql"
import type React from "react"
import { useRef, useState } from "react"
import { graphql, useFragment, useRelayEnvironment } from "react-relay"
import { useOrder2ExpressCheckoutSetFulfillmentOptionMutation } from "./Mutations/useOrder2ExpressCheckoutSetFulfillmentOptionMutation"
import { useOrder2ExpressCheckoutSetOrderPaymentMutation } from "./Mutations/useOrder2ExpressCheckoutSetOrderPaymentMutation"
import { useOrder2ExpressCheckoutSubmitOrderMutation } from "./Mutations/useOrder2ExpressCheckoutSubmitOrderMutation"
import { useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation } from "./Mutations/useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation"
import { useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation } from "./Mutations/useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation"
import { useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation } from "./Mutations/useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation"

interface Order2ExpressCheckoutUIProps {
  order: Order2ExpressCheckoutUI_order$key
}

const logger = createLogger("ExpressCheckoutUI")

// This prop has no type definition in stripe
type HandleCancelCallback = NonNullable<
  React.ComponentProps<typeof ExpressCheckoutElement>["onCancel"]
>

const EXPRESS_CHECKOUT_OPEN_RESOLVE_DELAY_MS = 500

export const Order2ExpressCheckoutUI: React.FC<
  Order2ExpressCheckoutUIProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)

  const elements = useElements()
  const stripe = useStripe()
  const environment = useRelayEnvironment()

  const setFulfillmentOptionMutation =
    useOrder2ExpressCheckoutSetFulfillmentOptionMutation()
  const setOrderPaymentMutation =
    useOrder2ExpressCheckoutSetOrderPaymentMutation()
  const updateOrderShippingAddressMutation =
    useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation()
  const submitOrderMutation = useOrder2ExpressCheckoutSubmitOrderMutation()
  const unsetFulfillmentOptionMutation =
    useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation()
  const unsetPaymentMethodMutation =
    useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation()

  const [expressCheckoutType, setExpressCheckoutType] =
    useState<ExpressPaymentType | null>(null)
  const [error, setError] = useState<CheckoutErrorBannerMessage | null>(null)

  const errorRef = useRef<string | null>(null)

  const {
    setExpressCheckoutLoaded,
    redirectToOrderDetails,
    setExpressCheckoutState,
    expressCheckoutState,
    checkoutMode,
    setCheckoutMode,
    checkoutTracking,
    setConfirmationToken,
    editFulfillmentDetails,
  } = useCheckoutContext()

  if (!(stripe && elements)) {
    return null
  }

  const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
    buttonTheme: {
      applePay: "white-outline",
      googlePay: "white",
    },
    buttonHeight: 50,
    paymentMethods: {
      applePay: "always",
      googlePay: "always",
      link: "never",
      amazonPay: "never",
      paypal: "never",
    },
    layout: {
      overflow: "never",
    },
    buttonType: {
      googlePay: "plain",
    },
  }

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: true,
    phoneNumberRequired: true,
    business: { name: "Artsy" },
  }

  /** Helper to update shipping address and extract data
   * conditionally also sets the first fulfillment option for express checkouts
   * that require it (Google Pay)
   */
  const setShippingAddress = async (params: {
    city?: string
    state?: string
    country: string
    postal_code?: string
    name: string
  }): Promise<OrderMutationResult> => {
    const result = await updateOrderShippingAddressMutation.submitMutation({
      variables: {
        input: {
          id: orderData.internalID,
          shippingCity: params.city,
          shippingRegion: params.state,
          shippingCountry: params.country,
          shippingPostalCode: params.postal_code,
          shippingName: params.name,
        },
      },
    })

    const order = validateAndExtractOrderResponse(
      result.updateOrderShippingAddress?.orderOrError,
    ).order

    const initialResult = {
      order,
      shippingRates: extractShippingRates(order),
      lineItems: extractLineItems(order),
    }

    // Check if shipping options are available
    if (initialResult.shippingRates.length === 0) {
      // No shipping options available - throw error to exit checkout
      throw new LocalCheckoutError("no_shipping_options")
    }

    // Auto-select first fulfillment option for Google Pay
    // Google Pay doesn't reliably trigger onShippingRateChange, so we auto-set for it
    const requiresFulfillmentAutoSelect = expressCheckoutType === "google_pay"
    if (requiresFulfillmentAutoSelect) {
      return await setFulfillmentOption(
        initialResult.shippingRates[0].id as FulfillmentOptionInputEnum,
      )
    }

    return initialResult
  }

  /**
   * Helper to set fulfillment option and extract data
   */
  const setFulfillmentOption = async (
    fulfillmentType: FulfillmentOptionInputEnum,
  ): Promise<OrderMutationResult> => {
    const result = await setFulfillmentOptionMutation.submitMutation({
      variables: {
        input: {
          id: orderData.internalID,
          fulfillmentOption: {
            type: fulfillmentType,
          },
        },
      },
    })

    const order = validateAndExtractOrderResponse(
      result.setOrderFulfillmentOption?.orderOrError,
    ).order

    return {
      order,
      shippingRates: extractShippingRates(order),
      lineItems: extractLineItems(order),
    }
  }

  // Helper to update Stripe elements with order details
  const updateStripeElements = (order: ParseableOrder) => {
    const buyerTotalMinor = order.buyerTotal?.minor

    if (buyerTotalMinor != null) {
      elements?.update({
        amount: buyerTotalMinor,
      })
    }
  }

  const resetOrder = async (options?: {
    errorCode?: string
    submissionError?: boolean
  }) => {
    const { errorCode, submissionError = false } = options || {}

    window.removeEventListener("beforeunload", preventHardReload)

    // Only show reset spinner if not preserving existing submit spinner
    if (!submissionError) {
      setExpressCheckoutState("reset")
    }

    try {
      const { unsetOrderPaymentMethod } =
        await unsetPaymentMethodMutation.submitMutation({
          variables: { input: { id: orderData.internalID } },
        })

      const { unsetOrderFulfillmentOption } =
        await unsetFulfillmentOptionMutation.submitMutation({
          variables: { input: { id: orderData.internalID } },
        })

      validateAndExtractOrderResponse(unsetOrderPaymentMethod?.orderOrError)
      validateAndExtractOrderResponse(unsetOrderFulfillmentOption?.orderOrError)

      // Show error if provided
      if (errorCode) {
        const errorBannerProps =
          expressCheckoutErrorBannerPropsForCode(errorCode)
        setError(errorBannerProps)
      }
    } catch (error) {
      logger.error("Error resetting order", error)
    } finally {
      // Reset local state
      setExpressCheckoutType(null)
      setCheckoutMode("standard")
      setExpressCheckoutState(null)
    }
  }

  const handleOpenExpressCheckout = async ({
    expressPaymentType,
    resolve,
  }: StripeExpressCheckoutElementClickEvent) => {
    setCheckoutMode("express")
    setExpressCheckoutState("awaiting")
    // Manually go back to first buy now step to avoid ui glitches under the express checkout ui
    editFulfillmentDetails()
    setExpressCheckoutType(expressPaymentType)

    checkoutTracking.clickedExpressCheckout({
      walletType: expressPaymentType,
    })
    const { itemsTotal } = orderData

    try {
      const allowedShippingCountries =
        extractAllowedShippingCountries(orderData)

      if (itemsTotal?.minor != null) {
        elements?.update({
          amount: itemsTotal.minor,
        })
      }

      setTimeout(() => {
        resolve({
          ...checkoutOptions,
          allowedShippingCountries,
          lineItems: [{ name: "Subtotal", amount: itemsTotal?.minor }],
        })
      }, EXPRESS_CHECKOUT_OPEN_RESOLVE_DELAY_MS)
    } catch (error) {
      logger.error("Error opening express checkout", error)
    }
  }

  const handleCancel: HandleCancelCallback = async () => {
    const errorCode = errorRef.current
    errorRef.current = null

    if (!errorCode) {
      checkoutTracking.clickedCancelExpressCheckout({
        walletType: expressCheckoutType as string,
      })
    }

    // Allow cancel when awaiting user action or not in express checkout
    // Prevent cancel during submit/reset operations
    const canCancel =
      !expressCheckoutState || expressCheckoutState === "awaiting"

    if (canCancel) {
      await resetOrder({ errorCode: errorCode || undefined })
    } else {
      setExpressCheckoutType(null)
    }
  }

  // User selects a shipping address
  const handleShippingAddressChange = async ({
    address,
    name,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingAddressChangeEvent) => {
    const { city, state, country, postal_code } = address

    try {
      const result = await setShippingAddress({
        city,
        state,
        country,
        postal_code,
        name,
      })

      updateStripeElements(result.order)

      resolve({
        shippingRates: result.shippingRates,
        lineItems: result.lineItems,
      })
    } catch (error) {
      errorRef.current = error.code || "unknown_error"
      logger.error("Error updating shipping address", {
        code: error.code,
        message: error.message,
        error,
      })
      reject()
    }
  }

  // User selects a shipping rate
  const handleShippingRateChange = async ({
    shippingRate,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingRateChangeEvent) => {
    try {
      const result = await setFulfillmentOption(
        shippingRate.id as FulfillmentOptionInputEnum,
      )

      updateStripeElements(result.order)

      resolve({
        shippingRates: result.shippingRates,
        lineItems: result.lineItems,
      })
    } catch (error) {
      errorRef.current = error.code || "unknown_error"
      logger.error("Error setting fulfillment option", {
        code: error.code,
        message: error.message,
        error,
      })
      reject()
    }
  }

  // User confirms the payment
  const handleConfirm = async ({
    billingDetails,
    shippingAddress,
    expressPaymentType,
    shippingRate,
  }: StripeExpressCheckoutElementConfirmEvent) => {
    window.removeEventListener("beforeunload", preventHardReload)
    setExpressCheckoutState("submit")

    const creditCardWalletType =
      expressPaymentType.toUpperCase() as OrderCreditCardWalletTypeEnum

    const {
      name,
      address: { line1, line2, city, state, postal_code, country },
    } = shippingAddress as NonNullable<
      StripeExpressCheckoutElementConfirmEvent["shippingAddress"]
    >

    const { phone } = billingDetails as NonNullable<
      StripeExpressCheckoutElementConfirmEvent["billingDetails"]
    >

    checkoutTracking.submittedOrder({
      walletType: expressPaymentType,
    })

    try {
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit()
      if (submitError) {
        logger.error("stripe elements.submit() error", {
          code: submitError.code,
          message: submitError.message,
          fullError: submitError,
        })
        const errorCode = (submitError.code || "submit_error") as string
        await resetOrder({ errorCode, submissionError: true })
        return
      }

      // Create the ConfirmationToken using the details collected by the Payment Element
      const { error, confirmationToken } = await stripe.createConfirmationToken(
        {
          elements,
          params:
            shippingRate?.id === "PICKUP"
              ? {
                  shipping: {
                    address: {
                      line1: null,
                      line2: null,
                      city: null,
                      postal_code: null,
                      state: null,
                      country: null,
                    },
                    name: null,
                  },
                }
              : undefined,
        },
      )

      if (error) {
        // This point is only reached if there's an immediate error when
        // creating the ConfirmationToken (before payment submission).
        logger.error("stripe.createConfirmationToken() error", {
          errorCode: error.code,
          errorMessage: error.message,
          fullError: error,
        })

        const errorCode = (error.code || "confirmation_token_error") as string
        await resetOrder({ errorCode, submissionError: true })
        return
      }

      // Persist confirmation token to context
      await fetchAndSetConfirmationToken(
        confirmationToken.id,
        environment,
        setConfirmationToken,
      )

      // Update order payment method with confirmation token
      const updateOrderPaymentMethodResult =
        await setOrderPaymentMutation.submitMutation({
          variables: {
            input: {
              id: orderData.internalID,
              paymentMethod: "CREDIT_CARD",
              creditCardWalletType,
              stripeConfirmationToken: confirmationToken.id,
            },
          },
        })

      validateAndExtractOrderResponse(
        updateOrderPaymentMethodResult.setOrderPayment?.orderOrError,
      )

      // Finally we have all fulfillment details
      const updateOrderShippingAddressResult =
        await updateOrderShippingAddressMutation.submitMutation({
          variables: {
            input: {
              id: orderData.internalID,
              buyerPhoneNumber: phone,
              buyerPhoneNumberCountryCode: null,
              shippingName: shippingRate?.id === "PICKUP" ? null : name,
              shippingAddressLine1:
                shippingRate?.id === "PICKUP" ? null : line1,
              shippingAddressLine2:
                shippingRate?.id === "PICKUP" ? null : line2,
              shippingPostalCode:
                shippingRate?.id === "PICKUP" ? null : postal_code,
              shippingCity: shippingRate?.id === "PICKUP" ? null : city,
              shippingRegion: shippingRate?.id === "PICKUP" ? null : state,
              shippingCountry: shippingRate?.id === "PICKUP" ? null : country,
            },
          },
        })

      validateAndExtractOrderResponse(
        updateOrderShippingAddressResult.updateOrderShippingAddress
          ?.orderOrError,
      )

      const submitOrderResult = await submitOrderMutation.submitMutation({
        variables: {
          input: {
            id: orderData.internalID,
            confirmationToken: confirmationToken.id,
          },
        },
      })

      validateAndExtractOrderResponse(
        submitOrderResult.submitOrder?.orderOrError,
      )

      // Redirect to status page after successful order submission
      redirectToOrderDetails()
      return
    } catch (error) {
      logger.error("Error confirming payment", {
        errorCode: error.code,
        errorMessage: error.message,
        fullError: error,
      })

      const errorCode = (error.code || "unknown_error") as string
      await resetOrder({ errorCode, submissionError: true })
    }
  }

  const handleReady = e => {
    let enabledPaymentMethods: ExpressCheckoutPaymentMethod[] = []
    try {
      enabledPaymentMethods = extractEnabledPaymentMethods(
        e.availablePaymentMethods,
      )
      if (enabledPaymentMethods) {
        checkoutTracking.expressCheckoutViewed({
          walletTypes: enabledPaymentMethods,
        })
      }
    } catch (error) {
      logger.error("Error handling ready event", error)
    } finally {
      setExpressCheckoutLoaded(enabledPaymentMethods)
    }
  }

  return (
    <Box>
      <SectionHeading>Express checkout</SectionHeading>
      <Spacer y={[1, 1, 2]} />
      {error && checkoutMode === "express" && (
        <>
          <CheckoutErrorBanner
            error={error}
            analytics={{
              flow: "Express checkout",
            }}
          />
          <Spacer y={1} />
        </>
      )}
      <Box minWidth="240px" maxWidth="100%" paddingX="1px">
        <ExpressCheckoutElement
          options={expressCheckoutOptions}
          onClick={handleOpenExpressCheckout}
          onCancel={handleCancel}
          onReady={handleReady}
          onShippingAddressChange={handleShippingAddressChange}
          onShippingRateChange={handleShippingRateChange}
          onLoadError={e => {
            logger.error("Express checkout element error", e)
          }}
          onConfirm={handleConfirm}
        />
      </Box>
      <Text variant="xs" color="mono60" mt={[1, 1, 2]}>
        <>By clicking Pay, I agree to Artsy's </>
        <RouterLink
          inline
          to="https://www.artsy.net/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          General Terms and Conditions of Sale
        </RouterLink>
        .
      </Text>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment Order2ExpressCheckoutUI_order on Order {
    internalID
    source
    mode
    buyerTotal {
      minor
      currencyCode
    }
    itemsTotal {
      minor
    }
    shippingTotal {
      minor
    }
    taxTotal {
      minor
    }
    availableShippingCountries
    fulfillmentOptions {
      type
      amount {
        minor
        currencyCode
      }
      selected
    }
    fulfillmentDetails {
      addressLine1
      addressLine2
      city
      postalCode
      region
      country
      name
    }

    lineItems {
      artwork {
        internalID
        slug
      }
    }
  }
`

type SetFulfillmentOrderResult = OrderMutationSuccess<
  NonNullable<
    useOrder2ExpressCheckoutSetFulfillmentOptionMutation$data["setOrderFulfillmentOption"]
  >["orderOrError"]
>["order"]

type ParseableOrder =
  | Order2ExpressCheckoutUI_order$data
  | SetFulfillmentOrderResult

type OrderMutationResult = {
  order: ParseableOrder
  shippingRates: Array<ShippingRate>
  lineItems: Array<LineItem>
}

const extractLineItems = (order: ParseableOrder): Array<LineItem> => {
  const { itemsTotal, shippingTotal, taxTotal } = order

  if (!itemsTotal) {
    throw new Error("itemsTotal is required")
  }

  let shippingLine: LineItem | null = null
  let taxLine: LineItem | null = null

  const itemsSubtotal = {
    name: "Subtotal",
    amount: itemsTotal.minor,
  }

  const selectedFulfillmentOption = order.fulfillmentOptions.find(
    option => option.selected,
  )

  if (selectedFulfillmentOption && shippingTotal) {
    const shippingRate = shippingRateForFulfillmentOption(
      selectedFulfillmentOption,
    )
    shippingLine = {
      name: shippingRate?.displayName || "Shipping",
      amount: shippingTotal.minor,
    }
  }

  if (taxTotal) {
    taxLine = {
      name: "Tax",
      amount: taxTotal.minor,
    }
  }

  const lineItems = (
    [itemsSubtotal, shippingLine, taxLine] as Array<LineItem>
  ).filter(Boolean)

  return lineItems
}

const extractAllowedShippingCountries = (
  order: ParseableOrder,
): ClickResolveDetails["allowedShippingCountries"] => {
  return order.availableShippingCountries.map(countryCode =>
    countryCode.toUpperCase(),
  )
}

const shippingRateForFulfillmentOption = option => {
  const { type, amount } = option
  switch (type) {
    case "DOMESTIC_FLAT":
    case "INTERNATIONAL_FLAT":
      if (amount) {
        return {
          id: type,
          displayName: "Shipping",
          amount: amount!.minor,
        }
      }
      break
    case "PICKUP":
      if (amount) {
        return {
          id: type,
          displayName: "Pickup",
          amount: amount!.minor,
        }
      }
      break
    case "SHIPPING_TBD":
      return null
    default:
      logger.error("Unhandled fulfillment option", type)
      return null
  }
}

const sortPickupLast = (a: ShippingRate, b: ShippingRate) => {
  // Sort pickup last
  if (a.id === "PICKUP" && b.id !== "PICKUP") {
    return 1
  }
  if (a.id !== "PICKUP" && b.id === "PICKUP") {
    return -1
  }
  return 0
}

const extractShippingRates = (order: ParseableOrder): Array<ShippingRate> => {
  const rates = order.fulfillmentOptions
    .map(shippingRateForFulfillmentOption)
    .filter(Boolean) as ShippingRate[]
  const selectedFulfillmentOption = order.fulfillmentOptions.find(
    option => option.selected,
  )
  if (selectedFulfillmentOption?.type === "PICKUP") {
    // if pickup is selected, it should be the first option since Stripe auto
    // selects the first option
    return rates
  } else {
    // on modal open, the first option should always be ship
    return rates.sort(sortPickupLast)
  }
}

function extractEnabledPaymentMethods(
  paymentMethods: AvailablePaymentMethods,
): ExpressCheckoutPaymentMethod[] {
  if (!paymentMethods) return []
  return Object.entries(paymentMethods)
    .filter(([_, isAvailable]) => isAvailable)
    .map(([method]) => method) as ExpressCheckoutPaymentMethod[]
}

const expressCheckoutErrorBannerPropsForCode = (
  errorCode: string,
): CheckoutErrorBannerMessage => {
  // Errors that can occur after express checkout closes and during backend processing

  // Backend payment processing errors
  if (["create_credit_card_failed"].includes(errorCode)) {
    return {
      title: "Payment failed",
      message: "There was an issue with your payment method. Please try again.",
      code: errorCode,
    }
  }

  // Log unhandled error codes
  logger.error("Unhandled express checkout error code:", errorCode)

  // Fallback for all other errors
  return {
    title: "An error occurred",
    message: (
      <>
        Something went wrong. Please try again or contact <MailtoOrderSupport />
        .
      </>
    ) as React.ReactNode,
    displayText: `Something went wrong. Please try again or contact ${ORDER_SUPPORT_EMAIL}.`,
    code: errorCode,
  }
}
