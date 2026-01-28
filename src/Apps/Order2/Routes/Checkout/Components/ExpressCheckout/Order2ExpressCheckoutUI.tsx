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
import type { ExpressCheckoutPaymentMethod } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { CheckoutErrorBanner } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { fetchAndSetConfirmationToken } from "Apps/Order2/Utils/confirmationTokenUtils"
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
import { useEffect, useRef, useState } from "react"
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
  const [error, setError] = useState<object | null>(null)

  const errorRef = useRef<string | null>(null)

  const {
    setExpressCheckoutLoaded,
    redirectToOrderDetails,
    setExpressCheckoutSubmitting,
    expressCheckoutSubmitting,
    checkoutMode,
    setCheckoutMode,
    checkoutTracking,
    setConfirmationToken,
  } = useCheckoutContext()

  useEffect(() => {
    const storedError = sessionStorage.getItem("expressCheckoutError")

    const errorDetails = storedError ? JSON.parse(storedError) : null

    if (errorDetails) {
      setError(errorDetails)
      sessionStorage.removeItem("expressCheckoutError")
    }
  }, [])

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

  // Helper to update shipping address and extract data
  const updateShippingAddress = async (params: {
    city?: string
    state?: string
    country: string
    postal_code?: string
    name: string
  }) => {
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

    return {
      order,
      shippingRates: extractShippingRates(order),
      lineItems: extractLineItems(order),
    }
  }

  // Helper to set fulfillment option and extract data
  const setFulfillmentOption = async (
    fulfillmentType: FulfillmentOptionInputEnum,
  ) => {
    logger.warn("Setting fulfillment option:", fulfillmentType)
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
      logger.warn("Updating Stripe elements with amount:", buyerTotalMinor)
      elements?.update({
        amount: buyerTotalMinor,
      })
    } else {
      logger.error("buyerTotal is null, cannot update Stripe elements")
    }
  }

  const updateOrderTotalAndResolve = (args: {
    buyerTotalMinor?: number | null
    resolveDetails: () => void
    timeout?: number
  }) => {
    const { buyerTotalMinor, resolveDetails, timeout = 500 } = args
    logger.warn("Updating order total", buyerTotalMinor)
    if (buyerTotalMinor != null) {
      logger.warn("Calling elements.update with amount", buyerTotalMinor)
      elements?.update({
        amount: buyerTotalMinor,
      })
    } else {
      logger.error("buyerTotalMinor is null or undefined, skipping update")
    }
    setTimeout(() => {
      resolveDetails()
    }, timeout)
  }

  const resetOrder = async () => {
    window.removeEventListener("beforeunload", preventHardReload)

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

    window.location.reload()
  }

  const handleOpenExpressCheckout = async ({
    expressPaymentType,
    resolve,
  }: StripeExpressCheckoutElementClickEvent) => {
    setCheckoutMode("express")
    setExpressCheckoutType(expressPaymentType)

    checkoutTracking.clickedExpressCheckout({
      walletType: expressPaymentType,
    })
    const { itemsTotal } = orderData

    try {
      const allowedShippingCountries =
        extractAllowedShippingCountries(orderData)

      return updateOrderTotalAndResolve({
        buyerTotalMinor: itemsTotal?.minor,
        resolveDetails: () =>
          resolve({
            ...checkoutOptions,
            allowedShippingCountries,
            lineItems: [{ name: "Subtotal", amount: itemsTotal?.minor }],
          }),
      })
    } catch (error) {
      logger.error("Error resetting order on load", error)
    }
  }

  const handleCancel: HandleCancelCallback = async () => {
    logger.warn("Express checkout element cancelled - resetting")

    if (!errorRef.current) {
      checkoutTracking.clickedCancelExpressCheckout({
        walletType: expressCheckoutType as string,
      })
    }

    if (errorRef.current) {
      checkoutTracking.errorMessageViewed({
        error_code: errorRef.current,
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        flow: "Express checkout",
      })

      sessionStorage.setItem(
        "expressCheckoutError",
        JSON.stringify({
          title: "An error occurred",
        }),
      )

      errorRef.current = null
    }

    setExpressCheckoutType(null)

    if (!expressCheckoutSubmitting) {
      resetOrder()
    }
  }

  // Internal handler for shipping address changes
  const processShippingAddressChange = async (params: {
    city?: string
    state?: string
    country: string
    postal_code?: string
    name: string
  }) => {
    // Update shipping address and get initial data
    const updateShippingAddressResult = await updateShippingAddress(params)
    let fulfillmentOptionAutoSelectResult: Awaited<
      ReturnType<typeof setFulfillmentOption>
    > | null = null

    // Set the first shipping rate as the fulfillment option to ensure we have a full price
    // Google Pay doesn't reliably trigger onShippingRateChange, so we auto-set for it
    const requiresShippingRateSelection = expressCheckoutType === "google_pay"
    if (
      requiresShippingRateSelection &&
      updateShippingAddressResult.shippingRates.length > 0 &&
      updateShippingAddressResult.shippingRates[0].id !==
        CALCULATING_SHIPPING_RATE.id
    ) {
      logger.warn(
        "Auto-setting fulfillment option from first shipping rate:",
        updateShippingAddressResult.shippingRates[0].id,
      )
      fulfillmentOptionAutoSelectResult = await setFulfillmentOption(
        updateShippingAddressResult.shippingRates[0]
          .id as FulfillmentOptionInputEnum,
      )
    }

    const targetResult =
      fulfillmentOptionAutoSelectResult ?? updateShippingAddressResult

    logger.warn("processShippingAddressChange - result:", {
      shippingRates: targetResult.shippingRates,
      lineItems: targetResult.lineItems,
      buyerTotal: targetResult.order.buyerTotal?.minor,
    })

    updateStripeElements(targetResult.order)

    return {
      shippingRates: targetResult.shippingRates,
      lineItems: targetResult.lineItems,
    }
  }

  // User selects a shipping address
  const handleShippingAddressChange = async ({
    address,
    name,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingAddressChangeEvent) => {
    logger.warn("Express checkout element address change", address)

    const { city, state, country, postal_code } = address

    try {
      const { shippingRates, lineItems } = await processShippingAddressChange({
        city,
        state,
        country,
        postal_code,
        name,
      })

      resolve({ shippingRates, lineItems })
    } catch (error) {
      errorRef.current = error.code || "unknown_error"
      logger.error("Error updating order", error)
      reject()
    }
  }

  // Internal handler for shipping rate changes
  const processShippingRateChange = async (rateId: string) => {
    const result = await setFulfillmentOption(
      rateId as FulfillmentOptionInputEnum,
    )

    logger.warn("processShippingRateChange - result:", {
      shippingRates: result.shippingRates,
      lineItems: result.lineItems,
      buyerTotal: result.order.buyerTotal?.minor,
    })

    updateStripeElements(result.order)

    return {
      shippingRates: result.shippingRates,
      lineItems: result.lineItems,
    }
  }

  // User selects a shipping rate
  const handleShippingRateChange = async ({
    shippingRate,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingRateChangeEvent) => {
    logger.warn("Shipping rate change", shippingRate)

    if (shippingRate.id === CALCULATING_SHIPPING_RATE.id) {
      errorRef.current = "shipping_options_not_available"
      logger.error(
        "Shipping options not available yet, skipping setting fulfillment option",
      )
      reject()
      return
    }

    try {
      const { shippingRates, lineItems } = await processShippingRateChange(
        shippingRate.id,
      )

      resolve({ shippingRates, lineItems })
    } catch (error) {
      errorRef.current = error.code || "unknown_error"
      logger.error("Error updating order", error)
      reject()
    }
  }

  // User confirms the payment
  const onConfirm = async ({
    paymentFailed,
    billingDetails,
    shippingAddress,
    expressPaymentType,
    shippingRate,
  }: StripeExpressCheckoutElementConfirmEvent) => {
    window.removeEventListener("beforeunload", preventHardReload)
    setExpressCheckoutSubmitting(true)

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
        logger.error(submitError)
        setExpressCheckoutSubmitting(false)
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
        // creating the ConfirmationToken. Show the error to customer (for example, payment details incomplete)
        logger.error(error)
        setExpressCheckoutSubmitting(false)
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

      // Set fulfillment option from the selected shipping rate
      // This ensures the fulfillment type is set even if onShippingRateChange wasn't triggered
      if (shippingRate?.id) {
        await setFulfillmentOption(
          shippingRate.id as FulfillmentOptionInputEnum,
        )
      }

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
      logger.error("Error confirming payment", error)
      errorRef.current = error.code || "unknown_error"

      checkoutTracking.errorMessageViewed({
        error_code: errorRef.current,
        title: "Payment failed",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        flow: "Express checkout",
      })

      sessionStorage.setItem(
        "expressCheckoutError",
        JSON.stringify({
          title: "Payment failed",
        }),
      )

      resetOrder()
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
      <Text variant={["sm-display", "sm-display", "md"]}>Express checkout</Text>
      <Spacer y={[1, 1, 2]} />
      {error && checkoutMode === "express" && (
        <>
          <CheckoutErrorBanner error={error} />
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
          onConfirm={onConfirm}
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

const extractLineItems = (order: ParseableOrder): Array<LineItem> => {
  const { itemsTotal, shippingTotal, buyerTotal, taxTotal } = order

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

  logger.warn(
    "extractLineItems - fulfillmentOptions:",
    order.fulfillmentOptions,
  )
  logger.warn(
    "extractLineItems - selectedFulfillmentOption:",
    selectedFulfillmentOption,
  )
  logger.warn("extractLineItems - shippingTotal:", shippingTotal)
  logger.warn("extractLineItems - taxTotal:", taxTotal)
  logger.warn("extractLineItems - buyerTotal:", buyerTotal)

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

  const lineItemsSum = lineItems.reduce((sum, item) => sum + item.amount, 0)
  logger.warn("Line items", lineItems)
  logger.warn(
    "Line items sum:",
    lineItemsSum,
    "vs buyerTotal:",
    buyerTotal?.minor,
  )

  return lineItems
}

const extractAllowedShippingCountries = (
  order: ParseableOrder,
): ClickResolveDetails["allowedShippingCountries"] => {
  return order.availableShippingCountries.map(countryCode =>
    countryCode.toUpperCase(),
  )
}

const CALCULATING_SHIPPING_RATE = {
  id: "CALCULATING_SHIPPING",
  displayName: "Calculating shipping...",
  // Express checkout requires a number for amount
  amount: 0,
} as const

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
      // TODO: Maybe we no longer return this (rates might be empty on
      // server, define our fallback CALCULATING_SHIPPING_RATE in this file)
      return null
    default:
      logger.warn("Unhandled fulfillment option", type)
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
  const shippingRatesOnly = rates.filter(rate => rate.id !== "PICKUP")
  const finalRates =
    shippingRatesOnly.length === 0
      ? rates.concat(CALCULATING_SHIPPING_RATE)
      : rates
  const selectedFulfillmentOption = order.fulfillmentOptions.find(
    option => option.selected,
  )
  if (selectedFulfillmentOption?.type === "PICKUP") {
    // if pickup is selected, it should be the first option since Stripe auto
    // selects the first option
    return finalRates
  } else {
    // on modal open, the first option should always be ship
    return finalRates.sort(sortPickupLast)
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
