import { FC } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button, Spacer } from "@artsy/palette"

export const BankDebitForm: FC = () => {
  const elements = useElements()
  const stripe = useStripe()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    })

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          fields: {
            billingDetails: "never",
          },
        }}
      />
      <Spacer mt={2} />
      <Button width="100%" type="submit">
        Review and Pay
      </Button>
    </form>
  )
}
