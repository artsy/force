import { FC, RefObject, ReactElement, useState } from "react"
import {
  Button,
  Clickable,
  CreditCardIcon,
  Flex,
  InstitutionIcon,
  Spacer,
  BorderedRadio,
  RadioGroup,
  RadioProps,
  Text,
  Collapse,
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
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { ActionType, OwnerType } from "@artsy/cohesion"
import { extractNodes } from "v2/Utils/extractNodes"

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
  const tracking = useTracking()

  const isACHEnabled = useFeatureFlag("stripe_ACH")
  const isWireTransferEnabled =
    useFeatureFlag("wire_transfer") &&
    !!extractNodes(order.lineItems)[0].artwork?.partner?.name // TODO: instead of partner name, check 'wireTransferEnabled' when available

  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<
    PaymentMethods
  >(
    isACHEnabled
      ? PaymentMethods.BankDebit
      : isWireTransferEnabled
      ? PaymentMethods.WireTransfer
      : PaymentMethods.CreditCard
  )

  const availablePaymentMethods: React.ReactElement<
    RadioProps
  >[] = getAvailablePaymentMethods(isWireTransferEnabled, isACHEnabled)

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

  const handleWireTransferSaveAndContinue = () => {
    console.log("wire transfer selected")
  }

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
          setCurrentPaymentMethod(val as PaymentMethods)
        }}
        defaultValue={currentPaymentMethod}
      >
        {availablePaymentMethods.map(method => method)}
      </RadioGroup>
      <Spacer mb={4} />
      <Text variant="lg">Payment details</Text>
      <Spacer mb={2} />

      {/* Credit Card */}
      <Collapse open={currentPaymentMethod === PaymentMethods.CreditCard}>
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

      {/* Bank debit */}
      <Collapse open={currentPaymentMethod === PaymentMethods.BankDebit}>
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

      {/* Wire transfer */}
      <Collapse open={currentPaymentMethod === PaymentMethods.WireTransfer}>
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

/*
returns all available payment methods, by checking relevant feature flags
TODO: when ACH and wire_transfer FFs is removed, this function can be removed and radios can be moved to PaymentContent
*/
const getAvailablePaymentMethods = (
  isWireTransferEnabled,
  isACHEnabled
): ReactElement<RadioProps>[] => {
  const paymentMethods = [
    <BorderedRadio
      value={PaymentMethods.CreditCard}
      label={
        <>
          <CreditCardIcon type="Unknown" />
          <Text ml={1}>Credit card</Text>
        </>
      }
    />,
  ]

  if (isWireTransferEnabled) {
    paymentMethods.unshift(
      <BorderedRadio
        value={PaymentMethods.WireTransfer}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text ml={1}>Wire transfer</Text>
          </>
        }
      />
    )
  }

  if (isACHEnabled) {
    paymentMethods.unshift(
      <BorderedRadio
        value={PaymentMethods.BankDebit}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text ml={1}>Bank transfer (US bank account)</Text>
          </>
        }
      />
    )
  }

  return paymentMethods
}
