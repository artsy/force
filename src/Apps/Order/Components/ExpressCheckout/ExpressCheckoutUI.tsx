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
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { preventHardReload } from "Apps/Order/OrderApp"
import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import {
  Box,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
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
import type {
  ExpressCheckoutUI_order$data,
  ExpressCheckoutUI_order$key,
} from "__generated__/ExpressCheckoutUI_order.graphql"
import type {
  FulfillmentOptionInputEnum,
  useSetFulfillmentOptionMutation$data,
} from "__generated__/useSetFulfillmentOptionMutation.graphql"
import type {
  OrderCreditCardWalletTypeEnum,
  useUpdateOrderMutation$data,
} from "__generated__/useUpdateOrderMutation.graphql"
import { type Dispatch, type SetStateAction, useRef, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface ExpressCheckoutUIProps {
  order: ExpressCheckoutUI_order$key
  setShowSpinner?: Dispatch<SetStateAction<boolean>>
}

const logger = createLogger("ExpressCheckoutUI")

// This prop has no type definition in stripe
type HandleCancelCallback = NonNullable<
  React.ComponentProps<typeof ExpressCheckoutElement>["onCancel"]
>

export const ExpressCheckoutUI = ({
  order,
  setShowSpinner,
}: ExpressCheckoutUIProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const [visible, setVisible] = useState(false)
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
  const orderTracking = useOrderTracking()
  const errorRef = useRef<string | null>(null)
  const [hasMultiplePaymentOptions, setHasMultiplePaymentOptions] =
    useState<boolean>(false)
  const shippingContext = useShippingContext()
  const [expressCheckoutSubmitting, setExpressCheckoutSubmitting] =
    useState(false)

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

      setShowSpinner?.(true)

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
      window.location.reload()
    } catch (error) {
      logger.error("Error confirming payment", error)
      errorRef.current = error.code || "unknown_error"

      orderTracking.errorMessageViewed({
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
    try {
      const paymentMethods = e.availablePaymentMethods

      if (paymentMethods) {
        setHasMultiplePaymentOptions(
          Object.values(paymentMethods).filter(Boolean).length > 1,
        )

        setVisible(true)

        orderTracking.expressCheckoutViewed({
          order: orderData,
          walletType: getAvailablePaymentMethods(paymentMethods),
        })
      }
    } finally {
      shippingContext.actions.setIsExpressCheckoutLoading(false)
    }
  }

  return (
    <Box display={visible ? "block" : "none"}>
      <Text variant="lg-display">Express checkout</Text>
      <Spacer y={1} />
      <Box
        minWidth="240px"
        maxWidth={hasMultiplePaymentOptions ? "100%" : ["100%", "50%"]}
        paddingX="1px"
      >
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
      <Spacer y={4} />
    </Box>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment ExpressCheckoutUI_order on Order {
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
  | ExpressCheckoutUI_order$data
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

function getAvailablePaymentMethods(
  paymentMethods: AvailablePaymentMethods,
): string[] {
  return Object.entries(paymentMethods)
    .filter(([_, isAvailable]) => isAvailable)
    .map(([method]) => method)
}

export const EXPRESS_CHECKOUT_PLACEHOLDER = (
  <Skeleton>
    <SkeletonText variant="lg-display">Express checkout</SkeletonText>
    <Spacer y={1} />
    <SkeletonBox width={["100%", "50%"]} height={50} borderRadius={50} />
    <Spacer y={1} />
    <SkeletonText variant="xs" ml={0.5}>
      By clicking Pay, I agree to Artsy’s General Terms and Conditions of Sale
    </SkeletonText>
    <Spacer y={4} />
  </Skeleton>
)
