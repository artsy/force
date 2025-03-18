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
  StripeExpressCheckoutElementConfirmEvent,
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

export const ExpressCheckoutUI = ({ order }: ExpressCheckoutUIProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const [visible, setVisible] = useState(false)
  const elements = useElements()
  const stripe = useStripe()
  const clientSecret = "client_secret_id"
  const { trackEvent } = useTracking()

  if (!(stripe && elements)) {
    return null
  }

  const primaryLineItem = orderData.lineItems[0]
  const primaryArtwork = primaryLineItem?.artwork

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: true,
    phoneNumberRequired: true,

    // TODO: possible conflict between initial rates from order,
    //   rates set as a result of the legacy setShippingMutation,
    //   and rates set as a result of the express checkout flow's automatic
    //   shipping address selection event below.
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
    console.warn("Express checkout element cancelled")
  }

  // User selects a shipping address
  const handleShippingAddressChange = async ({
    // Stripe type only guarantees a partial address
    address,
    name,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingAddressChangeEvent) => {
    console.warn("Express checkout element address change", address)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { line1, line2, city, state, postalCode, country } = address
    /*
    
    option 1: mutate order address, get calculated result (ie with shipping rates)
    from order JSON
      - update order saved shipping address, get order back with new rates

      resolve({ shippingRates: newOrder.fulfillmentOptions })

    option 2: send a request to fetch fulfillment options for order-address combination
    without updating order
      - send request to (for example) `/me/order/:id/fulfillment-options` for new rates
      - set local state here for what we have of the shipping address
      - assume that the rates will still be 'valid' when the user confirms the order,
        i.e. that the same state will yield the same result later

      resolve({ shippingRates: newRates })
    */
    try {
      resolve()
    } catch (error) {
      reject()
    }
  }

  // User selects a shipping rate
  const handleShippingRateChange = async ({
    shippingRate,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingRateChangeEvent) => {
    console.warn("Shipping rate change", shippingRate)
    /*
    
    option 1 : mutate order fulfillment type, get calculated result
       (ie taxes ready to submit order) from order JSON
     - send update to order to save selected fulfillment option (shipping rate) and whatever
       shipping destination data we do have available
     - result should include full data now like taxes...

     option 2
      - send a new request to get estimated taxes based on line items including shipping rate
      - set local state here similar to above for both shipping rate and taxes
    */

    try {
      resolve()
    } catch (error) {
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
      address: { line1, line2, city, state, postalCode, country },
    } = shippingAddress as NonNullable<
      StripeExpressCheckoutElementConfirmEvent["shippingAddress"]
    >

    const { phone } = billingDetails as NonNullable<
      StripeExpressCheckoutElementConfirmEvent["billingDetails"]
    >

    // const

    try {
      const { error } = await stripe.confirmPayment({
        elements: elements,
        clientSecret,
        confirmParams: {
          return_url: "https://artsy.net/",
        },
      })

      if (error) {
        console.error("Error confirming payment", error)
        return
      }
    } catch (error) {
      console.error("Error confirming payment", error)
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
          console.error("Express checkout element error", e)
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
