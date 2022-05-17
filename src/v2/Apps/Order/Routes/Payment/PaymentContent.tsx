import { FC, RefObject, useState } from "react"
import {
  Button,
  Clickable,
  Flex,
  Spacer,
  BorderedRadio,
  RadioGroup,
  Text,
  Collapse,
  InstitutionIcon,
} from "@artsy/palette"
import {
  PaymentPicker,
  PaymentPickerFragmentContainer,
} from "../../Components/PaymentPicker"
import { Media } from "v2/Utils/Responsive"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"
import { ContinueButton } from "./index"
import { Payment_me } from "v2/__generated__/Payment_me.graphql"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { CommitMutation } from "../../Utils/commitMutation"
import { useTracking } from "v2/System"
import { ActionType, OwnerType } from "@artsy/cohesion"

enum PaymentMethods {
  CreditCard = "credit_card",
  BankDebit = "bank_debit",
  WireTransfer = "wire_transfer",
}

export interface Props {
  order: Payment_order
  me: Payment_me
  commitMutation: CommitMutation
  isLoading: boolean
  onContinue: () => void
  paymentPicker: RefObject<PaymentPicker>
}

export const PaymentContent: FC<Props> = props => {
  const {
    commitMutation,
    isLoading,
    onContinue,
    me,
    order,
    paymentPicker,
  } = props
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.BankDebit
  )

  const tracking = useTracking()

  const trackClickedPaymentMethod = (val: string): void => {
    const event = {
      subject: "click_payment_method",
      payment_method: val,
      action: ActionType.clickedChangePaymentMethod,
      flow: order.mode!,
      context_page_owner_type: OwnerType.ordersPayment,
      order_id: order.internalID,
      amount: order.buyerTotal,
      currency: order.currencyCode,
    }
    tracking.trackEvent(event)
  }

  const handleWireTransferSaveAndContinue = () => console.log("yo")

  return (
    <Flex
      flexDirection="column"
      style={isLoading ? { pointerEvents: "none" } : {}}
    >
      <Spacer mb={2} />
      <Text variant="lg">Payment method</Text>
      <Spacer mb={2} />
      <RadioGroup
        onSelect={val => {
          trackClickedPaymentMethod(val)
          setPaymentMethod(val as PaymentMethods)
        }}
        defaultValue={paymentMethod}
      >
        <BorderedRadio
          value={PaymentMethods.BankDebit}
          label="Bank transfer (US bank account)"
        />
        <BorderedRadio
          value={PaymentMethods.WireTransfer}
          label={
            <>
              <InstitutionIcon fill="green100" />
              <Text ml={1}>Wire transfer</Text>
            </>
          }
        />
        <BorderedRadio value={PaymentMethods.CreditCard} label="Credit card" />
      </RadioGroup>
      <Spacer mb={4} />
      <Text variant="lg">Payment details</Text>
      <Spacer mb={2} />
      <Collapse open={paymentMethod === PaymentMethods.CreditCard}>
        <PaymentPickerFragmentContainer
          commitMutation={commitMutation}
          me={me}
          order={order}
          innerRef={paymentPicker}
        />
        <Spacer mb={4} />
        <Media greaterThan="xs">
          <ContinueButton onClick={onContinue} loading={isLoading} />
        </Media>
      </Collapse>
      <Collapse open={paymentMethod === PaymentMethods.BankDebit}>
        <Text color="black60" variant="sm">
          • Bank transfer is powered by Stripe.
        </Text>
        <Text color="black60" variant="sm">
          • Search for your bank institution or select from the options below.
        </Text>
        <Text color="black60" variant="sm">
          • If you can not find your bank, please check your spelling or choose
          another payment method.
        </Text>
        <Spacer mb={2} />

        <BankDebitProvider order={order} />
      </Collapse>
      <Collapse open={paymentMethod === PaymentMethods.WireTransfer}>
        <Text color="black60" variant="sm">
          • To pay by wire transfer, complete checkout and one of our support
          specialists will reach out with next steps.
        </Text>
        <Text color="black60" variant="sm">
          • Your bank may charge a fee for the transaction.
        </Text>
        <Text color="black60" variant="sm">
          • Questions? Email{" "}
          <Clickable textDecoration="underline">orders@artsy.com</Clickable>
        </Text>
        <Spacer mb={4} />
        <Media greaterThan="xs">
          <Button
            onClick={handleWireTransferSaveAndContinue}
            variant="primaryBlack"
            width="100%"
          >
            Save and Continue
          </Button>
        </Media>
      </Collapse>
    </Flex>
  )
}
