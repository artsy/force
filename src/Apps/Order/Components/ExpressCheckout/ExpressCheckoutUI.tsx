import { Box, Spacer, Text } from "@artsy/palette"
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  ClickResolveDetails,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementOptions,
  StripeExpressCheckoutElementShippingAddressChangeEvent,
  StripeExpressCheckoutElementShippingRateChangeEvent,
} from "@stripe/stripe-js"
import { extractNodes } from "Utils/extractNodes"
import type { ExpressCheckoutUI_order$key } from "__generated__/ExpressCheckoutUI_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"

interface ExpressCheckoutUIProps {
  order: ExpressCheckoutUI_order$key
  pickup: boolean
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

  const firstLineItem = extractNodes(orderData.lineItems)[0] ?? {}
  const { artwork } = firstLineItem

  if (!artwork) {
    return null
  }

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: !pickup,
    phoneNumberRequired: true,
    // initial shipping rates
    shippingRates: pickup ? [PICKUP_RATE, FALLBACK_RATE] : [FALLBACK_RATE],
    allowedShippingCountries: ["US", "CA"],
  }

  const handleClick = ({ resolve }: StripeExpressCheckoutElementClickEvent) => {
    resolve(checkoutOptions)
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
    try {
      console.log("Express checkout element address change", { address, name })
    } catch (error) {
      console.error(error)
      reject()
    }
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
        onCancel={() => {
          // TODO: This is where we could reset the order back to its pre-checkout state
          console.log("Express checkout element cancelled")
        }}
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
  fragment ExpressCheckoutUI_order on CommerceOrder {
    internalID
    mode
    buyerTotalCents
    requestedFulfillment {
      __typename
    }
    currencyCode
    shippingTotalCents
    lineItems {
      edges {
        node {
          artwork {
            processWithArtsyShippingDomestic
            artsyShippingInternational
            euShippingOrigin
            shippingCountry
            onlyShipsDomestically
          }
          shippingQuoteOptions {
            edges {
              node {
                name
                priceCents
                tier
              }
            }
          }
        }
      }
    }
  }
`

// Only max-height can be animated
const UncollapsingBox = styled(Box)<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ visible }) => (visible ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`

const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
  buttonTheme: {
    applePay: "white-outline",
  },
  buttonHeight: 50,
}

// Fallback rate for if no fulfillment type is set yet
// this cannot be an empty array but feels like a hack to start with
// 'free' 'calculating' shipping
// Technically this could also be a flat rate if we know the artwork only
// ships to a single flat rate region
const FALLBACK_RATE: NonNullable<ClickResolveDetails["shippingRates"]>[number] =
  {
    id: "calculating-shipping",
    displayName: "Calculating...",
    amount: 0,
  }

const PICKUP_RATE: NonNullable<ClickResolveDetails["shippingRates"]>[number] = {
  id: "pickup",
  displayName: "Pick up in person",
  amount: 0,
}
