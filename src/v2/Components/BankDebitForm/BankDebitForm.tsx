import { FC, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Box, Button, Message, Spacer, Text } from "@artsy/palette"
import { useSystemContext, useTracking } from "v2/System"
import { LoadingArea } from "../LoadingArea"
import { preventHardReload } from "v2/Apps/Order/OrderApp"

interface Props {
  order: { mode: string | null; internalID: string }
  returnURL: string
  isUserHasEnoughFunds: boolean
}

export const BankDebitForm: FC<Props> = ({
  order,
  returnURL,
  isUserHasEnoughFunds,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const tracking = useTracking()
  const { user } = useSystemContext()

  const [isPaymentElementLoading, setIsPaymentElementLoading] = useState(true)
  const [isConfirmingAccountSetup, setIsConfirmingAccountSetup] = useState(
    false
  )

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
    setIsConfirmingAccountSetup(true)
    trackClickedContinue()

    if (!stripe || !elements || !user) return

    // Disable the "leave/reload site?" confirmation dialog as we're about to
    // confirm Stripe payment setup which leaves and redirects back.
    window.removeEventListener("beforeunload", preventHardReload)

    try {
      // confirm setup
      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: returnURL,
        },
      })

      if (error) {
        console.log("error", error)
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setIsConfirmingAccountSetup(false)
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

        {/* loading while setup and balance check in progress */}
        {isConfirmingAccountSetup && (
          <>
            <Message title="Processing account details" variant="info">
              <Text variant="sm">
                This may take a few seconds. Please do not close or refresh this
                window until complete.
              </Text>
            </Message>
            <Spacer mt={2} />
          </>
        )}

        {/* error when account has insufficient funds */}
        {!isUserHasEnoughFunds && (
          <>
            <Message
              title="This bank account doesn’t have enough funds."
              variant="error"
            >
              <Text variant="sm">
                Please choose or link to another bank account or select another
                payment method.
              </Text>
            </Message>
            <Spacer mt={2} />
          </>
        )}

        <Button
          loading={isConfirmingAccountSetup}
          disabled={!stripe || !isUserHasEnoughFunds}
          variant="primaryBlack"
          width="100%"
        >
          Save and Continue
        </Button>
      </LoadingArea>
    </form>
  )
}
