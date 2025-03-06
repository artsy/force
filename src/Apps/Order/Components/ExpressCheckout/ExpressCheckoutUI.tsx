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
  ShippingRate,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementOptions,
  StripeExpressCheckoutElementShippingAddressChangeEvent,
  StripeExpressCheckoutElementShippingRateChangeEvent,
} from "@stripe/stripe-js"
import type {
  ExpressCheckoutUI_order$data,
  ExpressCheckoutUI_order$key,
} from "__generated__/ExpressCheckoutUI_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"

interface ExpressCheckoutUIProps {
  order: ExpressCheckoutUI_order$key
}

const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
  buttonTheme: {
    applePay: "white-outline",
  },
  buttonHeight: 50,
}

export const ExpressCheckoutUI = ({ order }: ExpressCheckoutUIProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const [visible, setVisible] = useState(false)
  const elements = useElements()
  const stripe = useStripe()
  const clientSecret = "client_secret_id"
  const { trackEvent } = useTracking()

  const primaryLineItem = orderData.lineItems[0]
  const primaryArtwork = primaryLineItem?.artwork

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: true,
    phoneNumberRequired: true,
    shippingRates: extractShippingRates(orderData),
    allowedShippingCountries: extractAllowedShippingCountries(orderData),
  }

  const handleClick = ({
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

    trackEvent(event)

    resolve(checkoutOptions)
  }

  const handleCancel = ({
    expressPaymentType,
  }: StripeExpressCheckoutElementClickEvent) => {
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
      payment_method: expressPaymentType,
    }

    trackEvent(event)

    // TODO: This is where we could reset the order back to its pre-checkout state
    console.log("Express checkout element cancelled")
  }

  const onConfirm = async () => {
    if (!stripe || !elements) {
      return
    }

    const { error } = await stripe.confirmPayment({
      elements: elements,
      clientSecret,
      confirmParams: {
        return_url: "https://artsy.net/",
      },
    })

    if (error) {
      console.error(error)
    }
  }

  const handleShippingAddressChange = async ({
    // Stripe type only guarantees a partial address
    address,
    name,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingAddressChangeEvent) => {
    console.log("Express checkout element address change", address)
  }

  const handleShippingRateChange = async ({
    shippingRate,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingRateChangeEvent) => {
    console.log("Shipping rate change", shippingRate)
    try {
      resolve()
    } catch (error) {
      reject()
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
          console.log("Express checkout element error", e)
        }}
        onConfirm={onConfirm}
      />

      <Spacer y={4} />
    </UncollapsingBox>
  )
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

const extractAllowedShippingCountries = (
  order: ExpressCheckoutUI_order$data,
): ClickResolveDetails["allowedShippingCountries"] => {
  return order.availableShippingCountries.map(countryCode =>
    countryCode.toUpperCase(),
  )
}

const extractShippingRates = (
  order: ExpressCheckoutUI_order$data,
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
          console.warn("Unhandled fulfillment option", type)
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
