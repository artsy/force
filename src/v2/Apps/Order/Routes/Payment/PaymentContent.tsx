import {
  FC,
  RefObject,
  ReactElement,
  useEffect,
  useCallback,
  useState,
} from "react"
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
  CreditCardPicker,
  CreditCardPickerFragmentContainer,
} from "../../Components/CreditCardPicker"
import { Media } from "v2/Utils/Responsive"
import { ContinueButton } from "./index"
import { Payment_me } from "v2/__generated__/Payment_me.graphql"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { CommitMutation } from "../../Utils/commitMutation"
import { useTracking } from "v2/System"
import { ActionType, OwnerType } from "@artsy/cohesion"
import { CommercePaymentMethodEnum } from "v2/__generated__/useSetPaymentMutation.graphql"
import { BankAccountPickerFragmentContainer } from "../../Components/BankAccountPicker"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

export interface Props {
  order: Payment_order
  me: Payment_me
  commitMutation: CommitMutation
  isLoading: boolean
  paymentMethod: CommercePaymentMethodEnum
  setPayment: () => void
  onPaymentMethodChange: (paymentMethod: CommercePaymentMethodEnum) => void
  CreditCardPicker: RefObject<CreditCardPicker>
  onSetPaymentSuccess: () => void
  onSetPaymentError: (error: Error) => void
  bankAccountHasInsufficientFunds: boolean
  setBankAccountHasInsufficientFunds: (arg: boolean) => void
}

export const PaymentContent: FC<Props> = props => {
  const {
    commitMutation,
    isLoading,
    setPayment,
    me,
    order,
    CreditCardPicker,
    paymentMethod,
    onPaymentMethodChange,
    onSetPaymentSuccess,
    onSetPaymentError,
    bankAccountHasInsufficientFunds,
    setBankAccountHasInsufficientFunds,
  } = props
  const tracking = useTracking()

  const [
    trackedInitialPaymentMethod,
    setTrackedInitialPaymentMethod,
  ] = useState(false)

  const trackClickedPaymentMethod = useCallback(
    (val: string): void => {
      const { mode, internalID, buyerTotal, currencyCode } = order
      const event = {
        subject: "click_payment_method",
        payment_method: val,
        action: ActionType.clickedPaymentMethod,
        flow: mode!,
        context_page_owner_type: OwnerType.ordersPayment,
        order_id: internalID,
        amount: buyerTotal,
        currency: currencyCode,
      }
      tracking.trackEvent(event)
    },
    [tracking, order]
  )

  // TODO: Either fire it here (maybe need to memoize the function? or later)
  useEffect(() => {
    if (!trackedInitialPaymentMethod) {
      trackClickedPaymentMethod(paymentMethod)
      setTrackedInitialPaymentMethod(true)
    }
  }, [trackedInitialPaymentMethod, trackClickedPaymentMethod, paymentMethod])

  // we can be sure that when 1 method is available, it'll always be credit card
  if (order.availablePaymentMethods.length === 1) {
    return (
      <PaymentContentWrapper isLoading={isLoading}>
        <CreditCardPickerFragmentContainer
          commitMutation={props.commitMutation}
          me={me}
          order={order}
          innerRef={CreditCardPicker}
        />
        <Spacer mb={4} />
        <Media greaterThan="xs">
          <ContinueButton onClick={setPayment} loading={isLoading} />
        </Media>
      </PaymentContentWrapper>
    )
  }

  return (
    <PaymentContentWrapper isLoading={isLoading}>
      <Spacer mb={2} />
      <Text variant="lg-display">Payment method</Text>
      <Spacer mb={2} />
      <RadioGroup
        data-test="payment-methods"
        onSelect={val => {
          trackClickedPaymentMethod(val)
          onPaymentMethodChange(val as CommercePaymentMethodEnum)
        }}
        defaultValue={paymentMethod}
      >
        {getAvailablePaymentMethods(order.availablePaymentMethods).map(
          method => method
        )}
      </RadioGroup>
      <Spacer mb={4} />
      <Text variant="lg-display">Payment details</Text>
      <Spacer mb={2} />

      {/* Credit card */}
      <Collapse open={paymentMethod === "CREDIT_CARD"}>
        <CreditCardPickerFragmentContainer
          commitMutation={commitMutation}
          me={me}
          order={order}
          innerRef={CreditCardPicker}
        />
        <Spacer mb={4} />
        <Media greaterThan="xs">
          <ContinueButton onClick={setPayment} loading={isLoading} />
        </Media>
      </Collapse>

      {/* Bank debit */}
      <Collapse open={paymentMethod === "US_BANK_ACCOUNT"}>
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
        <BankAccountPickerFragmentContainer
          me={me}
          order={order}
          onSetPaymentSuccess={onSetPaymentSuccess}
          onSetPaymentError={onSetPaymentError}
          bankAccountHasInsufficientFunds={bankAccountHasInsufficientFunds}
          setBankAccountHasInsufficientFunds={
            setBankAccountHasInsufficientFunds
          }
        />
      </Collapse>

      {/* Wire transfer */}
      <Collapse open={paymentMethod === "WIRE_TRANSFER"}>
        <Text color="black60" variant="sm">
          • To pay by wire transfer, complete checkout and a member of the Artsy
          team will contact you with next steps by email.
        </Text>
        <Text color="black60" variant="sm">
          • Please inform your bank that you will be responsible for all wire
          transfer fees.
        </Text>
        <Text color="black60" variant="sm">
          • Questions? Email{" "}
          <Clickable cursor="text" textDecoration="underline">
            orders@artsy.net
          </Clickable>
        </Text>
        <Spacer mb={4} />
        <Media greaterThan="xs">
          <Button
            onClick={setPayment}
            variant="primaryBlack"
            loading={isLoading}
            width="50%"
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

const USBankOnlyLabel = styled(Text)`
  background-color: ${themeGet("colors.orange10")};
  color: ${themeGet("colors.orange150")};
  padding: 1px 5px;
  border-radius: 2px;
`

/*
returns all available payment methods, by checking relevant feature flags
TODO: when ACH and wire_transfer FFs is removed, this function can be removed and radios can be moved to PaymentContent
*/
const getAvailablePaymentMethods = (
  availablePaymentMethods: readonly CommercePaymentMethodEnum[]
): ReactElement<RadioProps>[] => {
  let paymentMethod: CommercePaymentMethodEnum = "CREDIT_CARD"
  const paymentMethods = [
    <BorderedRadio
      key="CREDIT_CARD"
      value={paymentMethod}
      label={
        <>
          <CreditCardIcon type="Unknown" fill="black100" />
          <Text ml={1}>Credit card</Text>
        </>
      }
    />,
  ]

  // push wire transfer as the last option
  if (availablePaymentMethods.includes("WIRE_TRANSFER")) {
    paymentMethods.push(
      <BorderedRadio
        key="WIRE_TRANSFER"
        value={(paymentMethod = "WIRE_TRANSFER")}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text ml={1}>Wire transfer</Text>
          </>
        }
      />
    )
  }

  // when available, unshift ACH since it's the first option we want to offer
  if (availablePaymentMethods.includes("US_BANK_ACCOUNT")) {
    paymentMethods.unshift(
      <BorderedRadio
        key="US_BANK_ACCOUNT"
        value={(paymentMethod = "US_BANK_ACCOUNT")}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text ml={1}>Bank transfer</Text>
            <USBankOnlyLabel ml={1}>US bank account only</USBankOnlyLabel>
          </>
        }
      />
    )
  }

  return paymentMethods
}
