import { FC } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button, Spacer } from "@artsy/palette"
import { useSystemContext } from "v2/System"

export const BankDebitForm: FC = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useSystemContext()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "https://staging.artsy.net/",
        payment_method_data: {
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      },
    })

    if (error) {
      console.log("error", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              name: "never",
              email: "never",
            },
          },
        }}
      />
      <Spacer mt={2} />
      <Button disabled={!stripe}>Review and Pay</Button>
    </form>
  )
}
