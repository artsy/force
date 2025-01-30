import { Spacer, Text } from "@artsy/palette"
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"

export const ExpressCheckout = () => {
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

  return (
    <>
      <Text variant="lg-display">Express checkout</Text>
      <Spacer y={1} />
      <ExpressCheckoutElement onConfirm={onConfirm} />
      <Spacer y={4} />
    </>
  )
}
