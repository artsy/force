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
import { useSetFulfillmentOptionMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useSetFulfillmentOptionMutation"
import { useSubmitOrderMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useSubmitOrderMutation"
import { useUnsetOrderFulfillmentOptionMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useUnsetOrderFulfillmentOptionMutation"
import { useUnsetOrderPaymentMethodMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useUnsetOrderPaymentMethodMutation"
import { useUpdateOrderMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useUpdateOrderMutation"
import { useUpdateOrderShippingAddressMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useUpdateOrderShippingAddressMutation"
import {
  type OrderMutationSuccess,
  validateAndExtractOrderResponse,
} from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { preventHardReload } from "Apps/Order/OrderApp"
import type { ExpressCheckoutPaymentMethod } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import type {
  Order2ExpressCheckoutUI_order$data,
  Order2ExpressCheckoutUI_order$key,
} from "__generated__/Order2ExpressCheckoutUI_order.graphql"
import type {
  FulfillmentOptionInputEnum,
  useSetFulfillmentOptionMutation$data,
} from "__generated__/useSetFulfillmentOptionMutation.graphql"
import type {
  OrderCreditCardWalletTypeEnum,
  useUpdateOrderMutation$data,
} from "__generated__/useUpdateOrderMutation.graphql"
import { useRef, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2ExpressCheckoutUIProps {
  order: Order2ExpressCheckoutUI_order$key
  isChrome?: boolean
}

const logger = createLogger("ExpressCheckoutUI")

// This prop has no type definition in stripe
type HandleCancelCallback = NonNullable<
  React.ComponentProps<typeof ExpressCheckoutElement>["onCancel"]
>

export const Order2ExpressCheckoutUI = ({
  order,
  isChrome,
}: Order2ExpressCheckoutUIProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const elements = useElements()
  const stripe = useStripe()

  const setFulfillmentOptionMutation = useSetFulfillmentOptionMutation()
  const updateOrderMutation = useUpdateOrderMutation()
  const updateOrderShippingAddressMutation =
    useUpdateOrderShippingAddressMutation()
  const submitOrderMutation = useSubmitOrderMutation()
  const unsetFulfillmentOptionMutation =
    useUnsetOrderFulfillmentOptionMutation()
  const unsetPaymentMethodMutation = useUnsetOrderPaymentMethodMutation()

  const [expressCheckoutType, setExpressCheckoutType] =
    useState<ExpressPaymentType | null>(null)

  // TODO: integrate with new checkout tracking if necessary
  const orderTracking = useCheckoutTracking()

  const errorRef = useRef<string | null>(null)

  const {
    setExpressCheckoutLoaded,
    redirectToOrderDetails,
    setShowOrderSubmittingSpinner,
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
      applePay: isChrome ? "never" : "always",
      googlePay: "always",
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

  const updateOrderTotalAndResolve = (args: {
    buyerTotalMinor?: number | null
    resolveDetails: () => void
    timeout?: number
  }) => {
    const { buyerTotalMinor, resolveDetails, timeout = 500 } = args
    logger.warn("Updating order total", buyerTotalMinor)
    buyerTotalMinor &&
      elements?.update({
        amount: buyerTotalMinor,
      })
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
    setExpressCheckoutType(expressPaymentType)

    orderTracking.clickedExpressCheckout({
      order: orderData,
      walletType: expressPaymentType,
    })
    const { itemsTotal } = orderData

    try {
      const allowedShippingCountries =
        extractAllowedShippingCountries(orderData)
      const shippingRates = [CALCULATING_SHIPPING_RATE]

      return updateOrderTotalAndResolve({
        buyerTotalMinor: itemsTotal?.minor,
        resolveDetails: () =>
          resolve({
            ...checkoutOptions,
            allowedShippingCountries,
            shippingRates,
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
      orderTracking.clickedCancelExpressCheckout({
        order: orderData,
        walletType: expressCheckoutType as string,
      })
    }

    if (errorRef.current) {
      orderTracking.errorMessageViewed({
        error_code: errorRef.current,
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        flow: "Express checkout",
      })

      // TODO: Implement order error handling
      // sessionStorage.setItem(
      //   "expressCheckoutError",
      //   JSON.stringify({
      //     title: "An error occurred",
      //   }),
      // )

      errorRef.current = null
    }

    setExpressCheckoutType(null)
    resetOrder()
  }

  // User selects a shipping address
  const handleShippingAddressChange = async ({
    // Stripe type only guarantees a partial address
    address,
    name,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingAddressChangeEvent) => {
    logger.warn("Express checkout element address change", address)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { city, state, country, postal_code } = address

    try {
      const updateOrderShippingAddressResult =
        await updateOrderShippingAddressMutation.submitMutation({
          variables: {
            input: {
              id: orderData.internalID,
              shippingCity: city,
              shippingRegion: state,
              shippingCountry: country,
              shippingPostalCode: postal_code,
              shippingName: name,
            },
          },
        })

      const validatedResult = validateAndExtractOrderResponse(
        updateOrderShippingAddressResult.updateOrderShippingAddress
          ?.orderOrError,
      )

      const shippingRates = extractShippingRates(validatedResult.order)
      const lineItems = extractLineItems(validatedResult.order)

      return updateOrderTotalAndResolve({
        buyerTotalMinor: validatedResult.order.buyerTotal?.minor,
        resolveDetails: () =>
          resolve({
            shippingRates,
            lineItems,
          }),
      })
    } catch (error) {
      errorRef.current = error.code || "unknown_error"
      logger.error("Error updating order", error)
      reject()
      return
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
      const result = await setFulfillmentOptionMutation.submitMutation({
        variables: {
          input: {
            id: orderData.internalID,
            fulfillmentOption: {
              type: shippingRate.id as FulfillmentOptionInputEnum,
            },
          },
        },
      })
      const data = result.setOrderFulfillmentOption?.orderOrError

      const validatedResult = validateAndExtractOrderResponse(data)

      const lineItems = extractLineItems(validatedResult.order)
      const shippingRates = extractShippingRates(validatedResult.order)

      return updateOrderTotalAndResolve({
        buyerTotalMinor: validatedResult.order.buyerTotal?.minor,
        resolveDetails: () =>
          resolve({
            shippingRates,
            lineItems,
          }),
      })
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
    setShowOrderSubmittingSpinner(true)

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

    orderTracking.submittedOrder({
      order: orderData,
      walletType: expressPaymentType,
    })

    try {
      // update order payment method
      const updateOrderPaymentMethodResult =
        await updateOrderMutation.submitMutation({
          variables: {
            input: {
              id: orderData.internalID,
              paymentMethod: "CREDIT_CARD",
              creditCardWalletType,
            },
          },
        })

      validateAndExtractOrderResponse(
        updateOrderPaymentMethodResult.updateOrder?.orderOrError,
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

      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit()
      if (submitError) {
        logger.error(submitError)
        setShowOrderSubmittingSpinner(false)
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
        setShowOrderSubmittingSpinner(false)
        return
      }

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
      console.log("Error confirming payment", error)
      logger.error("Error confirming payment", error)
      errorRef.current = error.code || "unknown_error"

      orderTracking.errorMessageViewed({
        error_code: errorRef.current,
        title: "Payment failed",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        flow: "Express checkout",
      })

      // TODO: Implement order error handling
      // sessionStorage.setItem(
      //   "expressCheckoutError",
      //   JSON.stringify({
      //     title: "Payment failed",
      //   }),
      // )

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
        orderTracking.expressCheckoutViewed({
          order: orderData,
          walletType: enabledPaymentMethods,
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
      <Text variant="sm-display">Express Checkout</Text>
      <Spacer y={1} />
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
      <Text variant="xs" color="mono60" mt={1} ml={0.5}>
        <>By clicking Pay, I agree to Artsy’s </>
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

const ORDER_FRAGMENT = graphql`
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
    useSetFulfillmentOptionMutation$data["setOrderFulfillmentOption"]
  >["orderOrError"]
>["order"]

type UpdateOrderResult = OrderMutationSuccess<
  NonNullable<useUpdateOrderMutation$data["updateOrder"]>["orderOrError"]
>["order"]

type ParseableOrder =
  | Order2ExpressCheckoutUI_order$data
  | SetFulfillmentOrderResult
  | UpdateOrderResult

const extractLineItems = (order: ParseableOrder): Array<LineItem> => {
  const { itemsTotal, shippingTotal } = order

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

  if (order.taxTotal) {
    taxLine = {
      name: "Tax",
      amount: order.taxTotal.minor,
    }
  }

  const lineItems = (
    [itemsSubtotal, shippingLine, taxLine] as Array<LineItem>
  ).filter(Boolean)

  logger.warn("Line items", lineItems)
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
  if (selectedFulfillmentOption!.type === "PICKUP") {
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
  return Object.entries(paymentMethods)
    .filter(([_, isAvailable]) => isAvailable)
    .map(([method]) => method) as ExpressCheckoutPaymentMethod[]
}
