import { Spacer, Text } from "@artsy/palette"
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { StripeExpressCheckoutElementOptions } from "@stripe/stripe-js"
import { useState } from "react"

export const ExpressCheckout = () => {
  const elements = useElements()
  const stripe = useStripe()
  const clientSecret = "client_secret_id"
  const [isReady, setIsReady] = useState(false)

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

  const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
    buttonTheme: {
      applePay: "white-outline",
    },
    buttonHeight: 50,
  }

  return (
    <>
      {isReady && (
        <>
          <Text variant="lg-display">Express checkout</Text>
          <Spacer y={1} />
        </>
      )}
      <ExpressCheckoutElement
        options={expressCheckoutOptions}
        onConfirm={onConfirm}
        onReady={e => {
          if (!!e.availablePaymentMethods) {
            setIsReady(true)
          }
        }}
      />
      {isReady && <Spacer y={4} />}
    </>
  )
}
