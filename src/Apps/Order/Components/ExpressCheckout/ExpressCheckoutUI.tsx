import {
  ActionType,
  type ClickedCancelExpressCheckout,
  type ClickedExpressCheckout,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Spacer, Text } from "@artsy/palette"
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  ClickResolveDetails,
  ExpressPaymentType,
  ShippingRate,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementOptions,
  StripeExpressCheckoutElementShippingAddressChangeEvent,
  StripeExpressCheckoutElementShippingRateChangeEvent,
} from "@stripe/stripe-js"
import { useSetFulfillmentOptionMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useSetFulfillmentOptionMutation"
import { useUpdateOrderMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useUpdateOrderMutation"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import createLogger from "Utils/logger"
import type { ExpressCheckoutUI_order$key } from "__generated__/ExpressCheckoutUI_order.graphql"
import type { FulfillmentOptionInputEnum } from "__generated__/useSetFulfillmentOptionMutation.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"

interface ExpressCheckoutUIProps {
  order: ExpressCheckoutUI_order$key
}

const logger = createLogger("ExpressCheckoutUI")

// This prop has no type definition in stripe
type HandleCancelCallback = NonNullable<
  React.ComponentProps<typeof ExpressCheckoutElement>["onCancel"]
>

export const ExpressCheckoutUI = ({ order }: ExpressCheckoutUIProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const [visible, setVisible] = useState(false)
  const elements = useElements()
  const stripe = useStripe()
  const clientSecret = "client_secret_id"
  const { trackEvent } = useTracking()
  const setFulfillmentOptionMutation = useSetFulfillmentOptionMutation()
  const updateOrderMutation = useUpdateOrderMutation()
  const [expressCheckoutType, setExpressCheckoutType] =
    useState<ExpressPaymentType | null>(null)

  if (!(stripe && elements)) {
    return null
  }

  const primaryLineItem = orderData.lineItems[0]
  const primaryArtwork = primaryLineItem?.artwork

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: true,
    phoneNumberRequired: true,
  }

  const resetOrder = async () => {
    // TODO: reset fulfillment type: Not yet supported
    //   const result = await setFulfillmentOptionMutation.submitMutation({
    //     variables: {
    //       input: {
    //         id: orderData.internalID,
    //         fulfillmentOption: null,
    //       },
    //     },
    //   })
    //   validateAndExtractOrderResponse(result.setOrderFulfillmentOption?.orderOrError)

    // reset fulfillment details
    const fulfillmentDetailsResult = await updateOrderMutation.submitMutation({
      variables: {
        input: {
          id: orderData.internalID,
          shippingName: null,
          shippingAddressLine1: null,
          shippingAddressLine2: null,
          shippingPostalCode: null,
          shippingCity: null,
          shippingRegion: null,
          shippingCountry: null,
          buyerPhoneNumber: null,
          buyerPhoneNumberCountryCode: null,
        },
      },
    })
    const validatedResult = validateAndExtractOrderResponse(
      fulfillmentDetailsResult.updateOrder?.orderOrError,
    )
    return validatedResult
  }

  const handleClick = async ({
    expressPaymentType,
    resolve,
  }: StripeExpressCheckoutElementClickEvent) => {
    const event: ClickedExpressCheckout = {
      action: ActionType.clickedExpressCheckout,
      context_page_owner_type: OwnerType.ordersShipping,
      // TODO: should this be order id?
      context_page_owner_id: primaryArtwork?.internalID ?? "",
      context_page_owner_slug: primaryArtwork?.slug ?? "",
      flow:
        orderData.source === "PARTNER_OFFER"
          ? "Partner offer"
          : orderData.mode === "BUY"
            ? "Buy now"
            : "Make offer",
      payment_method: expressPaymentType,
    }
    setExpressCheckoutType(expressPaymentType)

    trackEvent(event)
    try {
      const data = await resetOrder()
      const { order } = validateAndExtractOrderResponse(data)

      resolve({
        ...checkoutOptions,
        allowedShippingCountries: extractAllowedShippingCountries(order),
        shippingRates: extractShippingRates(order),
      })
    } catch (error) {
      logger.error("Error resetting order on load", error)
    }
  }

  const handleCancel: HandleCancelCallback = async () => {
    const event: ClickedCancelExpressCheckout = {
      action: ActionType.clickedCancelExpressCheckout,
      context_page_owner_type: OwnerType.ordersShipping,
      // TODO: should this be order id?
      context_page_owner_id: primaryArtwork?.internalID ?? "",
      context_page_owner_slug: primaryArtwork?.slug ?? "",
      flow:
        orderData.source === "PARTNER_OFFER"
          ? "Partner offer"
          : orderData.mode === "BUY"
            ? "Buy now"
            : "Make offer",
      payment_method: expressCheckoutType as string,
    }

    trackEvent(event)

    logger.warn("Express checkout element cancelled - resetting")
    await resetOrder()
    setExpressCheckoutType(null)
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
    const { city, state, country } = address

    try {
      const updateOrderResult = await updateOrderMutation.submitMutation({
        variables: {
          input: {
            id: orderData.internalID,
            shippingCity: city,
            shippingRegion: state,
            shippingCountry: country,
          },
        },
      })

      const validatedResult = validateAndExtractOrderResponse(
        updateOrderResult.updateOrder?.orderOrError,
      )

      const shippingRates = extractShippingRates(validatedResult.order)
      resolve({ shippingRates })
      return
    } catch (error) {
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
    logger.warn("Shipping rate change", shippingRate)

    if (shippingRate.id === "SHIPPING_TBD") {
      logger.warn(
        "Shipping rate is still calculating, skipping - order cannot be transacted yet",
      )
      resolve()
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

      const shippingRates = extractShippingRates(validatedResult.order)
      resolve({ shippingRates })
      return
    } catch (error) {
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
    const {
      name,
      address: { line1, line2, city, state, postal_code, country },
    } = shippingAddress as NonNullable<
      StripeExpressCheckoutElementConfirmEvent["shippingAddress"]
    >

    const { phone } = billingDetails as NonNullable<
      StripeExpressCheckoutElementConfirmEvent["billingDetails"]
    >

    try {
      // Finally we have all fulfillment details
      const updateOrderResult = await updateOrderMutation.submitMutation({
        variables: {
          input: {
            id: orderData.internalID,
            buyerPhoneNumber: phone,
            buyerPhoneNumberCountryCode: null,
            shippingName: name,
            shippingAddressLine1: line1,
            shippingAddressLine2: line2,
            shippingPostalCode: postal_code,
            shippingCity: city,
            shippingRegion: state,
            shippingCountry: country,
          },
        },
      })

      validateAndExtractOrderResponse(
        updateOrderResult.updateOrder?.orderOrError,
      )

      const { error } = await stripe.confirmPayment({
        elements: elements,
        clientSecret,
        confirmParams: {
          return_url: "https://artsy.net/",
        },
      })

      if (error) {
        logger.error("Error confirming payment", error)
        return
      }
    } catch (error) {
      logger.error("Error confirming payment", error)
    }
  }

  return (
    <UncollapsingBox visible={visible}>
      <Text variant="lg-display">Express checkout</Text>
      <Spacer y={1} />

      <ExpressCheckoutElement
        options={expressCheckoutOptions}
        onClick={handleClick}
        onCancel={handleCancel}
        onReady={e => {
          if (!!e.availablePaymentMethods) {
            setVisible(true)
          }
        }}
        onShippingAddressChange={handleShippingAddressChange}
        onShippingRateChange={handleShippingRateChange}
        onLoadError={e => {
          logger.error("Express checkout element error", e)
        }}
        onConfirm={onConfirm}
      />

      <Spacer y={4} />
    </UncollapsingBox>
  )
}

const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
  buttonTheme: {
    applePay: "white-outline",
  },
  buttonHeight: 50,
}

const ORDER_FRAGMENT = graphql`
  fragment ExpressCheckoutUI_order on Order {
    internalID
    source
    mode
    availableShippingCountries
    fulfillmentOptions {
      type
      amount {
        minor
        currencyCode
      }
      selected
    }
    lineItems {
      artwork {
        internalID
        slug
      }
    }
  }
`

interface OrderWithAvailableShippingCountries {
  readonly availableShippingCountries: ReadonlyArray<string>
}

const extractAllowedShippingCountries = (
  order: OrderWithAvailableShippingCountries,
): ClickResolveDetails["allowedShippingCountries"] => {
  return order.availableShippingCountries.map(countryCode =>
    countryCode.toUpperCase(),
  )
}

interface OrderWithFulfillmentOptions {
  readonly fulfillmentOptions: ReadonlyArray<{
    readonly type: string
    readonly amount?: { readonly minor?: number } | null
  }>
}

const extractShippingRates = (
  order: OrderWithFulfillmentOptions,
): Array<ShippingRate> => {
  return order.fulfillmentOptions
    .map(option => {
      const { type, amount } = option
      const rate: ShippingRate | null = null
      switch (type) {
        case "DOMESTIC_FLAT":
          if (amount) {
            return {
              id: type,
              displayName: "Domestic shipping",
              amount: amount.minor,
            }
          }
          break
        case "INTERNATIONAL_FLAT":
          if (amount) {
            return {
              id: type,
              displayName: "International shipping",
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
          return {
            id: type,
            displayName: "Calculating shipping...",
            // Express checkout requires a number for amount
            amount: 0,
          }
        default:
          logger.warn("Unhandled fulfillment option", type)
      }
      return rate
    })
    .filter(Boolean) as ShippingRate[]
}

// Only max-height can be animated
const UncollapsingBox = styled(Box)<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ visible }) => (visible ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`
