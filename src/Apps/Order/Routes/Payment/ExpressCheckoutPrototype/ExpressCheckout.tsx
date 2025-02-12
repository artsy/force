import { Box, Spacer, Text } from "@artsy/palette"
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { ClickResolveDetails } from "@stripe/stripe-js"
import { useState } from "react"
import styled from "styled-components"

export const ExpressCheckout = () => {
  const [visible, setVisible] = useState(false)
  const elements = useElements()
  const stripe = useStripe()
  const clientSecret = "client_secret_id"

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

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: true,

    shippingRates: [
      {
        id: "shipping-rate-id",
        displayName: "sloppy shipping",
        amount: 1000,
      },
      {
        id: "shipping-rate-id-2",
        displayName: "cool shipping",
        amount: 2000,
      },
    ],
  }

  return (
    <UncollapsingBox visible={visible}>
      <Text variant="lg-display">Express checkout</Text>
      <Spacer y={1} />

      <ExpressCheckoutElement
        onClick={({ resolve }) => {
          resolve(checkoutOptions)
        }}
        onReady={e => {
          if (!!e.availablePaymentMethods) {
            setVisible(true)
          }
          console.log("Express checkout element ready", e)
        }}
        onLoadError={e => {
          console.log("Express checkout element error", e)
        }}
        onConfirm={onConfirm}
      />

      <Spacer y={4} />
    </UncollapsingBox>
  )
}

// Only max-height can be animated
const UncollapsingBox = styled(Box)<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ visible }) => (visible ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`
