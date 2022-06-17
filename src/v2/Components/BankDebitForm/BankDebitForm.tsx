import { FC, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Box, Button, Spacer } from "@artsy/palette"
import { useSystemContext, useTracking } from "v2/System"
import { LoadingArea } from "../LoadingArea"
import { preventHardReload } from "v2/Apps/Order/OrderApp"

interface Props {
  order: { mode: string | null; internalID: string }
  returnURL: string
}

export const BankDebitForm: FC<Props> = ({ order, returnURL }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useSystemContext()
  const [isPaymentElementLoading, setIsPaymentElementLoading] = useState(true)
  const tracking = useTracking()

  const trackPaymentElementEvent = event => {
    const trackedEvents: any[] = []
    if (event.complete) {
      trackedEvents.push({
        flow: order.mode,
        order_id: order.internalID,
        subject: "bank_account_selected",
      })
    }
    if (!event.empty) {
      trackedEvents.push({
        flow: order.mode,
        order_id: order.internalID,
        subject: "TODO:_not_empty_thing",
      })
    }

    trackedEvents.forEach(event => tracking.trackEvent(event))
  }

  const trackClickedContinue = () => {
    tracking.trackEvent({
      flow: order.mode!,
      order_id: order.internalID,
      subject: "TODO:_clicked_save_and_continue",
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    // Disable the "leave/reload site?" confirmation dialog as we're about to
    // confirm Stripe payment setup which leaves and redirects back.
    window.removeEventListener("beforeunload", preventHardReload)

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: returnURL,
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
          onChange={event => {
            trackPaymentElementEvent(event)
          }}
          options={{
            // @ts-ignore TODO: remove when Stripe updates StripePaymentElementOptions
            defaultValues: {
              billingDetails: {
                name: user?.name,
                email: user?.email,
              },
            },
          }}
        />
        <Spacer mt={2} />
        <Button
          onClick={trackClickedContinue}
          disabled={!stripe}
          variant="primaryBlack"
          width="100%"
        >
          Save and Continue
        </Button>
      </LoadingArea>
    </form>
  )
}
