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
import { expressCheckoutErrorBannerPropsForCode } from "./expressCheckoutErrorBannerPropsForCode"

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

    // Auto-select first fulfillment option for Google Pay
    // Google Pay doesn't reliably trigger onShippingRateChange, so we auto-set for it
    const requiresFulfillmentAutoSelect = expressCheckoutType === "google_pay"
    if (
      requiresFulfillmentAutoSelect &&
      initialResult.shippingRates.length > 0 // TODO: This should be an error - exit checkout and display an error to user (pr #16653)
    ) {
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

  const resetOrder = async () => {
    window.removeEventListener("beforeunload", preventHardReload)

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
    } catch (error) {
      logger.error("Error resetting order", error)
    } finally {
      window.location.reload()
    }
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

      const errorBannerProps = expressCheckoutErrorBannerPropsForCode(
        errorRef.current,
      )
      sessionStorage.setItem(
        "expressCheckoutError",
        JSON.stringify(errorBannerProps),
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
      logger.error("Error updating order", error)
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
        // creating the ConfirmationToken.
        // TODO: Handle this error with the others below. (pr #16653)
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
      errorRef.current = (error.code || "unknown_error") as string

      checkoutTracking.errorMessageViewed({
        error_code: errorRef.current,
        title: "Payment failed",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        flow: "Express checkout",
      })

      const errorBannerProps = expressCheckoutErrorBannerPropsForCode(
        errorRef.current,
      )
      sessionStorage.setItem(
        "expressCheckoutError",
        JSON.stringify(errorBannerProps),
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
