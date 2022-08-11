import { FC, RefObject, ReactElement, useEffect, useRef } from "react"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType } from "@artsy/cohesion"
import {
  Clickable,
  Spacer,
  BorderedRadio,
  InstitutionIcon,
  CreditCardIcon,
  RadioGroup,
  Text,
  Collapse,
  RadioProps,
  InfoCircleIcon,
  Tooltip,
} from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { Payment_me } from "__generated__/Payment_me.graphql"
import {
  Payment_order,
  CommercePaymentMethodEnum,
} from "__generated__/Payment_order.graphql"

import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import {
  CreditCardPicker,
  CreditCardPickerFragmentContainer,
} from "Apps/Order/Components/CreditCardPicker"
import { BankAccountPickerFragmentContainer } from "Apps/Order/Components/BankAccountPicker"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"

export interface Props {
  order: Payment_order
  me: Payment_me
  commitMutation: CommitMutation
  paymentMethod: CommercePaymentMethodEnum
  setPayment: () => void
  onPaymentMethodChange: (paymentMethod: CommercePaymentMethodEnum) => void
  CreditCardPicker: RefObject<CreditCardPicker>
  bankAccountHasInsufficientFunds: boolean
  setBankAccountHasInsufficientFunds: (arg: boolean) => void
  onBankAccountContinue: () => void
  setIsProcessingPayment: (arg: boolean) => void
}

export const PaymentContent: FC<Props> = props => {
  const {
    commitMutation,
    setPayment,
    me,
    order,
    CreditCardPicker,
    paymentMethod,
    onPaymentMethodChange,
    bankAccountHasInsufficientFunds,
    setBankAccountHasInsufficientFunds,
    onBankAccountContinue,
    setIsProcessingPayment,
  } = props
  const tracking = useTracking()

  const previousPaymentMethod = useRef<string | null>(null)

  useEffect(() => {
    if (paymentMethod !== previousPaymentMethod.current) {
      const { mode, internalID, buyerTotal, currencyCode } = order
      previousPaymentMethod.current = paymentMethod

      const event = {
        subject: "click_payment_method",
        payment_method: paymentMethod,
        action: ActionType.clickedPaymentMethod,
        flow: mode!,
        context_page_owner_type: OwnerType.ordersPayment,
        order_id: internalID,
        amount: buyerTotal,
        currency: currencyCode,
      }
      tracking.trackEvent(event)
    }
  }, [order, paymentMethod, tracking])

  // we can be sure that when 1 method is available, it'll always be credit card
  if (order.availablePaymentMethods.length === 1) {
    return (
      <>
        <CreditCardPickerFragmentContainer
          commitMutation={props.commitMutation}
          me={me}
          order={order}
          innerRef={CreditCardPicker}
        />
        <Spacer mt={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={setPayment}
        />
        <Spacer mb={2} />
      </>
    )
  }

  return (
    <>
      <Text variant="lg-display">Payment method</Text>
      <Spacer mb={2} />
      <RadioGroup
        data-test="payment-methods"
        onSelect={val => {
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
        <Spacer mt={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={setPayment}
        />
        <Spacer mb={2} />
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
          bankAccountHasInsufficientFunds={bankAccountHasInsufficientFunds}
          setBankAccountHasInsufficientFunds={
            setBankAccountHasInsufficientFunds
          }
          onBankAccountContinue={onBankAccountContinue}
          setIsProcessingPayment={setIsProcessingPayment}
        />
      </Collapse>

      {/* Sepa debit */}
      <Collapse open={paymentMethod === "SEPA_DEBIT"}>
        <Flex>
          <Text color="black60" variant="sm">
            • Your bank account must be located in one of the SEPA
            member-states.
          </Text>
          <Tooltip
            placement="top-start"
            size="lg"
            width={400}
            content={
              <>
                <Text variant="sm">SEPA member-states</Text>
                <Spacer mb={2} />
                <Text variant="sm">
                  Austria, Belgium, Britain, Bulgaria, Croatia, Cyprus, Czech
                  Republic, Denmark, Estonia, Finland, France, Germany, Greece,
                  Hungary, Iceland, Ireland, Italy, Latvia, Liechtenstein,
                  Lithuania, Luxembourg, Malta, Monaco, Netherlands, Norway,
                  Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden,
                  and Switzerland.
                </Text>
              </>
            }
          >
            <Clickable ml={0.5} style={{ lineHeight: 0 }}>
              <InfoCircleIcon />
            </Clickable>
          </Tooltip>
        </Flex>
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
        <Spacer mt={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={setPayment}
        />
        <Spacer mb={2} />
      </Collapse>
    </>
  )
}

const USBankOnlyLabel = styled(Text)`
  background-color: ${themeGet("colors.orange10")};
  color: ${themeGet("colors.orange150")};
  padding: 1px 5px;
  border-radius: 2px;
  align-self: center;
`

const RadioWithLabel = styled(BorderedRadio)`
  div {
    flex-direction: row;
    flex-grow: 0;
    white-space: nowrap;
  }
`

/*
 * returns all available payment methods in the form of BorderRadio
 * by checking order's availablePaymentMethods
 */
const getAvailablePaymentMethods = (
  availablePaymentMethods: readonly CommercePaymentMethodEnum[]
): ReactElement<RadioProps>[] => {
  let paymentMethod: CommercePaymentMethodEnum = "CREDIT_CARD"
  const paymentMethods = [
    <BorderedRadio
      data-test-id="credit-card"
      key="CREDIT_CARD"
      value={paymentMethod}
      label={
        <>
          <CreditCardIcon type="Unknown" fill="black100" />
          <Text ml={0.5}>Credit card</Text>
        </>
      }
    />,
  ]

  // push wire transfer as the last option
  if (availablePaymentMethods.includes("WIRE_TRANSFER")) {
    paymentMethods.push(
      <BorderedRadio
        data-test-id="wire-transfer"
        key="WIRE_TRANSFER"
        value={(paymentMethod = "WIRE_TRANSFER")}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text ml={0.5}>Wire transfer</Text>
          </>
        }
      />
    )
  }

  // when available, unshift ACH since it's the first option we want to offer
  if (availablePaymentMethods.includes("US_BANK_ACCOUNT")) {
    paymentMethods.unshift(
      <RadioWithLabel
        data-test-id="us-bank-account"
        key="US_BANK_ACCOUNT"
        value={(paymentMethod = "US_BANK_ACCOUNT")}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text ml={0.5}>Bank transfer</Text>
          </>
        }
      >
        <USBankOnlyLabel ml={0.5} variant="xs">
          US bank account only
        </USBankOnlyLabel>
      </RadioWithLabel>
    )
  }

  // when available, unshift SEPA since it's the first option we want to offer
  if (availablePaymentMethods.includes("SEPA_DEBIT")) {
    paymentMethods.unshift(
      <RadioWithLabel
        data-test-id="sepa-debit"
        key="SEPA_DEBIT"
        value={(paymentMethod = "SEPA_DEBIT")}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text ml={0.5}>Bank transfer</Text>
          </>
        }
      >
        <USBankOnlyLabel ml={0.5} variant="xs">
          SEPA direct debit
        </USBankOnlyLabel>
      </RadioWithLabel>
    )
  }

  return paymentMethods
}
