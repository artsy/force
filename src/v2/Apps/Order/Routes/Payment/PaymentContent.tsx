import { FC, RefObject, ReactElement, useState } from "react"
import {
  Button,
  Clickable,
  Flex,
  Spacer,
  BorderedRadio,
  InstitutionIcon,
  CreditCardIcon,
  RadioGroup,
  Text,
  Collapse,
  RadioProps,
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
import { CommercePaymentMethodEnum } from "v2/__generated__/useSetPaymentMutation.graphql"

export interface Props {
  order: Payment_order
  me: Payment_me
  commitMutation: CommitMutation
  isLoading: boolean
  onContinue: () => void
  onWireTransferContinue: () => void
  paymentPicker: RefObject<PaymentPicker>
}

export const PaymentContent: FC<Props> = props => {
  const {
    commitMutation,
    isLoading,
    onContinue,
    onWireTransferContinue,
    me,
    order,
    paymentPicker,
  } = props
  const isACHEnabled = useFeatureFlag("stripe_ACH")
  const isWireTransferEnabled =
    useFeatureFlag("wire_transfer") &&
    order?.additionalPaymentMethods?.includes("wire_transfer")

  const tracking = useTracking()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    CommercePaymentMethodEnum
  >(isACHEnabled ? "ACH_TRANSFER" : "CREDIT_CARD")

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

  const availablePaymentMethods: ReactElement<
    RadioProps
  >[] = getAvailablePaymentMethods(isWireTransferEnabled, isACHEnabled)

  // we can be sure that when 1 method is available, it'll always be credit card
  if (availablePaymentMethods.length === 1) {
    return (
      <PaymentContentWrapper isLoading={isLoading}>
        <PaymentPickerFragmentContainer
          commitMutation={props.commitMutation}
          me={props.me}
          order={order}
          innerRef={paymentPicker}
        />
        <Spacer mb={4} />
        <Media greaterThan="xs">
          <ContinueButton onClick={onContinue} loading={isLoading} />
        </Media>
      </PaymentContentWrapper>
    )
  }

  return (
    <PaymentContentWrapper isLoading={isLoading}>
      {selectedPaymentMethod}
      <Spacer mb={2} />
      <Text variant="lg-display">Payment method</Text>
      <Spacer mb={2} />
      <RadioGroup
        onSelect={val => {
          trackClickedPaymentMethod(val)
          setSelectedPaymentMethod(val as CommercePaymentMethodEnum)
        }}
        defaultValue={selectedPaymentMethod}
      >
        {availablePaymentMethods.map(method => method)}
      </RadioGroup>
      <Spacer mb={4} />
      <Text variant="lg-display">Payment details</Text>
      <Spacer mb={2} />

      {/* Credit card */}
      <Collapse open={selectedPaymentMethod === "CREDIT_CARD"}>
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
      <Collapse open={selectedPaymentMethod === "ACH_TRANSFER"}>
        <Text color="black60" variant="sm">
          • Search for your bank institution or select from the options below.
        </Text>
        <Text color="black60" variant="sm">
          • If you can not find your bank, please check your spelling or choose
          another payment method.
        </Text>
        <Text color="black60" variant="sm">
          • Bank transfer is powered by Stripe.
        </Text>
        <Spacer mb={2} />
        <BankDebitProvider order={order} />
      </Collapse>

      {/* Wire transfer */}
      <Collapse open={selectedPaymentMethod === "WIRE_TRANSFER"}>
        <Text color="black60" variant="sm">
          • To pay by wire transfer, complete checkout and one of our support
          specialists will reach out with next steps.
        </Text>
        <Text color="black60" variant="sm">
          • Your bank may charge a fee for the transaction.
        </Text>
        <Text color="black60" variant="sm">
          • Questions? Email{" "}
          <Clickable cursor="text" textDecoration="underline">
            orders@artsy.com
          </Clickable>
        </Text>
        <Spacer mb={4} />
        <Media greaterThan="xs">
          <Button
            onClick={onWireTransferContinue}
            variant="primaryBlack"
            width="100%"
          >
            Save and Continue
          </Button>
        </Media>
      </Collapse>
    </PaymentContentWrapper>
  )
}

const PaymentContentWrapper: FC<{ isLoading: boolean }> = ({
  isLoading,
  children,
}) => (
  <Flex
    flexDirection="column"
    style={isLoading ? { pointerEvents: "none" } : {}}
  >
    {children}
  </Flex>
)

/*
returns all available payment methods, by checking relevant feature flags
TODO: when ACH and wire_transfer FFs is removed, this function can be removed and radios can be moved to PaymentContent
*/
const getAvailablePaymentMethods = (
  isWireTransferEnabled,
  isACHEnabled
): ReactElement<RadioProps>[] => {
  let paymentMethod: CommercePaymentMethodEnum = "CREDIT_CARD"
  const paymentMethods = [
    <BorderedRadio
      value={paymentMethod}
      label={
        <>
          <CreditCardIcon type="Unknown" fill="black60" />
          <Text ml={1}>Credit card</Text>
        </>
      }
    />,
  ]

  // push wire transfer as the last option
  if (isWireTransferEnabled) {
    paymentMethods.push(
      <BorderedRadio
        value={(paymentMethod = "WIRE_TRANSFER")}
        label={
          <>
            <InstitutionIcon fill="black60" />
            <Text ml={1}>Wire transfer</Text>
          </>
        }
      />
    )
  }

  // when available, unshift ACH since it's the first option we want to offer
  if (isACHEnabled) {
    paymentMethods.unshift(
      <BorderedRadio
        value={(paymentMethod = "ACH_TRANSFER")}
        label={
          <>
            <InstitutionIcon fill="black60" />
            <Text ml={1}>Bank transfer (US bank account)</Text>
          </>
        }
      />
    )
  }

  return paymentMethods
}
