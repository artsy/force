import { FC, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useSystemContext, useTracking } from "v2/System"
import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Flex,
  InfoCircleIcon,
  Tooltip,
  Spacer,
  Text,
} from "@artsy/palette"
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
  const [isSaveAccountChecked, setIsSaveAccountChecked] = useState(true)

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
        />
        <Spacer mt={2} />
        <Flex>
          <Checkbox
            selected={isSaveAccountChecked}
            onSelect={() => setIsSaveAccountChecked(!isSaveAccountChecked)}
            data-test="SaveBankAccountCheckbox"
          >
            Save bank account for later use.
          </Checkbox>
          <Flex>
            <Tooltip
              placement="top"
              size="lg"
              width={335}
              content={
                <Text fontSize={13}>
                  If you use Artsy’s services or purchase additional products
                  periodically pursuant to Artsy’s terms, you authorize Artsy to
                  debit your bank account periodically. Payments that fall
                  outside of the regular debits authorized above will only be
                  debited after your authorization is obtained.
                </Text>
              }
            >
              <Clickable ml={0.5} style={{ lineHeight: 0 }}>
                <InfoCircleIcon />
              </Clickable>
            </Tooltip>
          </Flex>
        </Flex>
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
