import { FC, useState } from "react"
import { StripeError } from "@stripe/stripe-js"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { ActionType, OwnerType } from "@artsy/cohesion"
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
import { camelCase, upperFirst } from "lodash"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"

interface Props {
  order: { mode: string | null; internalID: string }
  onError: (error: Error | StripeError) => void
}

export const BankDebitForm: FC<Props> = ({ order, onError }) => {
  const {
    selectedPaymentMethod,
    bankAccountHasInsufficientFunds,
    setBankAccountHasInsufficientFunds,
    setIsSavingPayment,
    setIsStripePaymentElementLoading,
  } = useOrderPaymentContext()

  const stripe = useStripe()
  const elements = useElements()
  const { user } = useSystemContext()
  const tracking = useTracking()

  const [isSaveAccountChecked, setIsSaveAccountChecked] = useState(true)

  const handlePaymentElementChange = event => {
    if (event.complete) {
      setBankAccountHasInsufficientFunds(false)

      tracking.trackEvent({
        flow: order.mode,
        order_id: order.internalID,
        subject: "link_account",
        context_page_owner_type: OwnerType.ordersPayment,
        action: ActionType.clickedPaymentDetails,
      })
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    // save account only for US_BANK_ACCOUNT (ACH)
    let saveAccount = isSaveAccountChecked
    if (selectedPaymentMethod !== "US_BANK_ACCOUNT") {
      saveAccount = false
    }

    const return_url = `${getENV("APP_URL")}/orders/${
      order.internalID
    }/payment?save_account=${saveAccount}`

    // Disable the "leave/reload site?" confirmation dialog as we're about to
    // confirm Stripe payment setup which leaves and redirects back.
    window.removeEventListener("beforeunload", preventHardReload)

    setIsSavingPayment(true)

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url,
      },
    })

    if (error) {
      setIsSavingPayment(false)
      onError(error)
      throw error
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "0px 4px" }}>
      <PaymentElement
        onReady={() => setIsStripePaymentElementLoading(false)}
        onChange={event => handlePaymentElementChange(event)}
        options={{
          defaultValues: {
            billingDetails: {
              name: user?.name,
              email: user?.email,
            },
          },
        }}
      />
      <Spacer y={4} />
      {/* Display checkbox for saving account only for ACH */}
      {selectedPaymentMethod === "US_BANK_ACCOUNT" && (
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
                  Thank you for signing up for direct debits from Artsy. You
                  have authorized Artsy and, if applicable, its affiliated
                  entities to debit the bank account specified above, on behalf
                  of sellers that use the Artsy website, for any amount owed for
                  your purchase of artworks from such sellers, according to
                  Artsy’s website and terms. You can change or cancel this
                  authorization at any time by providing Artsy with 30 (thirty)
                  days’ notice. By clicking “Save bank account for later use”,
                  you authorize Artsy to save the bank account specified above.
                </Text>
              }
            >
              <Clickable ml={0.5} style={{ lineHeight: 0 }}>
                <InfoCircleIcon />
              </Clickable>
            </Tooltip>
          </Flex>
        </Flex>
      )}

      {bankAccountHasInsufficientFunds && <InsufficientFundsError />}
      <Spacer y={4} />
      <SaveAndContinueButton
        testId={`saveNew${upperFirst(camelCase(selectedPaymentMethod))}`}
        disabled={!stripe || bankAccountHasInsufficientFunds}
      />
      <Spacer y={2} />
    </form>
  )
}
