import { FC, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Box, Button, Spacer } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { LoadingArea } from "../LoadingArea"

export const BankDebitForm: FC = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useSystemContext()
  const [isPaymentElementLoading, setIsPaymentElementLoading] = useState(true)

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "https://staging.artsy.net/",
      },
    })

    if (error) {
      console.log("error", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <LoadingArea isLoading={isPaymentElementLoading}>
        {isPaymentElementLoading && <Box height={300}></Box>}
        <PaymentElement
          onReady={() => setIsPaymentElementLoading(false)}
          onChange={event => console.log("event", event)}
        />
        <Spacer mt={2} />
        <Button disabled={!stripe} variant="primaryBlack" width="100%">
          Save and Continue
        </Button>
      </LoadingArea>
    </form>
  )
}
