import { FC, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import {
  Checkbox,
  Clickable,
  Flex,
  InfoCircleIcon,
  Tooltip,
  Spacer,
  Text,
} from "@artsy/palette"
import { useSystemContext } from "System"
import { useTracking } from "react-tracking"
import { InsufficientFundsError } from "Apps/Order/Components/InsufficientFundsError"
import { preventHardReload } from "Apps/Order/OrderApp"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"
import { getENV } from "Utils/getENV"

interface Props {
  order: { mode: string | null; internalID: string }
  bankAccountHasInsufficientFunds: boolean
  setIsProcessingPayment: (arg: boolean) => void
}

export const BankDebitForm: FC<Props> = ({
  order,
  bankAccountHasInsufficientFunds,
  setIsProcessingPayment,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useSystemContext()

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

    trackedEvents.forEach(event => tracking.trackEvent(event))
  }

  const handleSubmit = async event => {
    setIsProcessingPayment(true)
    event.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    const return_url = `${getENV("APP_URL")}/orders/${
      order.internalID
    }/payment?save_account=${isSaveAccountChecked}`

    // Disable the "leave/reload site?" confirmation dialog as we're about to
    // confirm Stripe payment setup which leaves and redirects back.
    window.removeEventListener("beforeunload", preventHardReload)

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url,
      },
    })

    if (error) {
      console.log("error", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "0px 4px" }}>
      <PaymentElement
        onReady={() => setIsProcessingPayment(false)}
        onChange={event => trackPaymentElementEvent(event)}
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
      <Spacer mt={4} />
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
            placement="top-start"
            size="lg"
            width={400}
            content={
              <Text fontSize={13} lineHeight={"18px"}>
                Thank you for signing up for direct debits from Artsy. You have
                authorized Artsy and, if applicable, its affiliated entities to
                debit the bank account specified above, on behalf of sellers
                that use the Artsy website, for any amount owed for your
                purchase of artworks from such sellers, according to Artsy’s
                website and terms. You can change or cancel this authorization
                at any time by providing Artsy with 30 (thirty) days’ notice. By
                clicking “Save bank account for later use”, you authorize Artsy
                to save the bank account specified above.
              </Text>
            }
          >
            <Clickable ml={0.5} style={{ lineHeight: 0 }}>
              <InfoCircleIcon />
            </Clickable>
          </Tooltip>
        </Flex>
      </Flex>

      {bankAccountHasInsufficientFunds && <InsufficientFundsError />}

      <SaveAndContinueButton
        data-test="bank-transfer-save-new"
        media={{ greaterThan: "xs" }}
        disabled={!stripe || bankAccountHasInsufficientFunds}
      />

      <Spacer mb={4} />
    </form>
  )
}
