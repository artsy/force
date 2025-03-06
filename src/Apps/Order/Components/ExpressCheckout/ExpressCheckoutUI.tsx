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
  pickup: boolean
}

const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
  buttonTheme: {
    applePay: "white-outline",
  },
  buttonHeight: 50,
}

export const ExpressCheckoutUI = ({
  order,
  pickup = true,
}: ExpressCheckoutUIProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const [visible, setVisible] = useState(false)
  const elements = useElements()
  const stripe = useStripe()
  const clientSecret = "client_secret_id"
  const { trackEvent } = useTracking()

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: !pickup,
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
      // TODO: need to get artwork/line item types - should this be order id?
      context_page_owner_id: "artwork-id", // artwork.internalID,
      context_page_owner_slug: "artwork-slug", // artwork.slug,
      flow:
        orderData.source === "partner_offer"
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
      // TODO: need to get artwork/line item types - should this be order id?
      context_page_owner_id: "artwork-id", // artwork.internalID,
      context_page_owner_slug: "artwork-slug", // artwork.slug,
      flow:
        orderData.source === "partner_offer"
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

    alert("onShippingAddressChange")
    // try {
    //   let variables: any
    //   if (pickup) {
    //     // TODO: From looking at the types on the checkout element events, saving pickup
    //     // might be required at the confirm step - ie save pickup, then submit order.
    //     // See the type for this address and references to phoneNumber in that typedefs file
    //     // variables = {
    //     //   input: {
    //     //     id: orderData.internalID,
    //     //     fulfillmentType: "PICKUP",
    //     //     phoneNumber: address.phone,
    //     //   },
    //     // }
    //     console.warn("Pickup does not apply")
    //     resolve()
    //   } else {
    //     // TODO: FIXME: NO PHONE NUMBER AVAILABLE ON ADDRESS OR BEFORE CONFIRM???
    //     console.log("Shipping address change", address)
    //     const fulfilmentType = requiresArtsyShippingTo(address.country, artwork)
    //       ? "SHIP_ARTA"
    //       : "SHIP"
    //     variables = {
    //       input: {
    //         id: orderData.internalID,
    //         fulfillmentType: fulfilmentType,
    //         shipping: {
    //           addressLine1: (address as ExpressCheckoutAddress).line1 ?? "",
    //           addressLine2: (address as ExpressCheckoutAddress).line2 ?? "",
    //           city: address.city,
    //           country: address.country,
    //           postalCode: address.postal_code,
    //           region: address.state,
    //           phoneNumber: "555-555-5555", //address.phone,
    //         },
    //       },
    //     }
    //   }
    //   const result = await saveFulfillmentDetails.submitMutation({
    //     variables,
    //   })
    //   const { orderOrError } = result.commerceSetShipping ?? {}
    //   console.log("Order or error", orderOrError)
    //   if (orderOrError?.__typename === "CommerceOrderWithMutationSuccess") {
    //     const firstLineItem = extractNodes(orderOrError.order.lineItems)[0]
    //     const lineItemResult = validateAndExtractLineItemData(firstLineItem)

    //     if (lineItemResult) {
    //       if (lineItemResult.requestedFulfillment === "PICKUP") {
    //         // TODO: Again, should not happen
    //         resolve()
    //         return
    //       }

    //       const shippingRates = extractShippingRates(
    //         lineItemResult,
    //         orderOrError.order,
    //       )

    //       resolve({
    //         shippingRates,
    //       })
    //     }
    //     return
    //   }
    // } catch (error) {
    //   console.error(error)
    //   reject()
    // }
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
    availableShippingCountries
    fulfillmentOptions {
      type
      amount {
        minor
        currencyCode
      }
      selected
    }
    # lineItems {
    #   edges {
    #     node {
    #       artwork {
    #         slug
    #         internalID
    #       }
    #     }
    #   }
    # }
    # mode

    # buyerTotalCents
    # requestedFulfillment {
    #   __typename
    # }
    # currencyCode
    # shippingTotalCents
    # source
    # shippingQuoteOptions {
    #   edges {
    #     node {
    #       name
    #       priceCents
    #       tier
    #     }
    #   }
    # }
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
      switch (option.type) {
        case "DOMESTIC_FLAT":
          return {
            id: option.type,
            displayName: "Domestic shipping",
            amount: option.amount!.minor,
            currency: option.amount!.currencyCode,
          } as ShippingRate
        case "INTERNATIONAL_FLAT":
          return {
            id: option.type,
            displayName: "International shipping",
            amount: option.amount!.minor,
            currency: option.amount!.currencyCode,
          } as ShippingRate
        case "PICKUP":
          return {
            id: option.type,
            displayName: "Pickup",
            amount: option.amount!.minor,
            currency: option.amount!.currencyCode,
          } as ShippingRate
        case "SHIPPING_TBD":
          return {
            id: option.type,
            displayName: "Calculating shipping...",
            amount: option.amount!.minor || 0,
            currency: option.amount!.currencyCode,
          } as ShippingRate
        default:
          console.warn("Unhandled fulfillment option", option.type)
          return null
      }
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
