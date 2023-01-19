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
  Flex,
} from "@artsy/palette"
import { Payment_me$data } from "__generated__/Payment_me.graphql"
import {
  Payment_order$data,
  CommercePaymentMethodEnum,
} from "__generated__/Payment_order.graphql"

import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import {
  CreditCardPicker,
  CreditCardPickerFragmentContainer,
} from "Apps/Order/Components/CreditCardPicker"
import { BankAccountPickerFragmentContainer } from "Apps/Order/Components/BankAccountPicker"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"
import { useOrderPaymentContext } from "./PaymentContext/OrderPaymentContext"

export interface Props {
  order: Payment_order$data
  me: Payment_me$data
  commitMutation: CommitMutation
  onSetPayment: () => void
  onError: (error: Error) => void
  CreditCardPicker: RefObject<CreditCardPicker>
}

export const PaymentContent: FC<Props> = props => {
  const { commitMutation, onSetPayment, me, order, CreditCardPicker } = props
  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useOrderPaymentContext()

  const tracking = useTracking()
  const previousPaymentMethod = useRef<string | null>(null)

  useEffect(() => {
    if (selectedPaymentMethod !== previousPaymentMethod.current) {
      const { mode, internalID, buyerTotal, currencyCode } = order
      previousPaymentMethod.current = selectedPaymentMethod

      const event = {
        subject: "click_payment_method",
        payment_method: selectedPaymentMethod,
        action: ActionType.clickedPaymentMethod,
        flow: mode!,
        context_page_owner_type: OwnerType.ordersPayment,
        order_id: internalID,
        amount: buyerTotal,
        currency: currencyCode,
      }
      tracking.trackEvent(event)
    }
  }, [order, selectedPaymentMethod, tracking])

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
        <Spacer y={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={onSetPayment}
        />
        <Spacer y={2} />
      </>
    )
  }

  return (
    <>
      <Text variant="lg-display">Payment method</Text>
      <Spacer y={2} />
      <RadioGroup
        data-test="payment-methods"
        onSelect={val => {
          setSelectedPaymentMethod(val as CommercePaymentMethodEnum)
        }}
        defaultValue={selectedPaymentMethod}
      >
        {getAvailablePaymentMethods(order.availablePaymentMethods).map(
          method => method
        )}
      </RadioGroup>
      <Spacer y={4} />
      <Text variant="lg-display">Payment details</Text>
      <Spacer y={2} />

      {/* Credit card */}
      <Collapse open={selectedPaymentMethod === "CREDIT_CARD"}>
        <CreditCardPickerFragmentContainer
          commitMutation={commitMutation}
          me={me}
          order={order}
          innerRef={CreditCardPicker}
        />
        <Spacer y={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={onSetPayment}
        />
        <Spacer y={2} />
      </Collapse>

      {/* US Bank transfer */}
      <Collapse open={selectedPaymentMethod === "US_BANK_ACCOUNT"}>
        {getPaymentMethodInfo(selectedPaymentMethod)}
        <Spacer y={2} />
        {selectedPaymentMethod === "US_BANK_ACCOUNT" && (
          <BankAccountPickerFragmentContainer
            me={me}
            order={order}
            onError={props.onError}
          />
        )}
      </Collapse>

      {/* SEPA bank transfer */}
      <Collapse open={selectedPaymentMethod === "SEPA_DEBIT"}>
        {getPaymentMethodInfo(selectedPaymentMethod)}
        <Spacer y={2} />
        {selectedPaymentMethod === "SEPA_DEBIT" && (
          <BankAccountPickerFragmentContainer
            me={me}
            order={order}
            onError={props.onError}
          />
        )}
      </Collapse>

      {/* Wire transfer */}
      <Collapse open={selectedPaymentMethod === "WIRE_TRANSFER"}>
        {getPaymentMethodInfo(selectedPaymentMethod, order.source)}
        <Spacer y={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={onSetPayment}
        />
        <Spacer y={2} />
      </Collapse>
    </>
  )
}

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
          <Text variant="sm-display" ml={0.5}>
            Credit card
          </Text>
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
            <Text variant="sm-display" ml={0.5}>
              Wire transfer
            </Text>
          </>
        }
      />
    )
  }

  // when available, unshift ACH since it's the first option we want to offer for US artworks
  if (availablePaymentMethods.includes("US_BANK_ACCOUNT")) {
    paymentMethods.unshift(
      <BorderedRadio
        data-test-id="us-bank-account"
        key="US_BANK_ACCOUNT"
        value={(paymentMethod = "US_BANK_ACCOUNT")}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text variant="sm-display" ml={0.5}>
              Bank transfer
            </Text>
          </>
        }
      >
        <Text ml="24px" variant="xs" color="black60">
          US bank account only
        </Text>
      </BorderedRadio>
    )
  }

  // when available, unshift SEPA since it's the first option we want to offer for EU artworks
  if (availablePaymentMethods.includes("SEPA_DEBIT")) {
    paymentMethods.unshift(
      <BorderedRadio
        data-test-id="sepa-debit"
        key="SEPA_DEBIT"
        value={(paymentMethod = "SEPA_DEBIT")}
        label={
          <>
            <InstitutionIcon fill="green100" />
            <Text variant="sm-display" ml={0.5}>
              SEPA bank transfer
            </Text>
          </>
        }
      >
        <Text ml="24px" variant="xs" color="black60">
          See full list of SEPA countries below
        </Text>
      </BorderedRadio>
    )
  }
  return paymentMethods
}

const getPaymentMethodInfo = (
  paymentMethod: CommercePaymentMethodEnum | string,
  orderSource?: string
) => {
  switch (paymentMethod) {
    case "WIRE_TRANSFER":
      if (orderSource === "private_sale") {
        return (
          <>
            <Text color="black60" variant="sm">
              • To pay by wire transfer, complete checkout to view banking
              details and wire transfer instructions.
            </Text>
            <Text color="black60" variant="sm">
              • Please inform your bank that you will be responsible for all
              wire transfer fees.
            </Text>
          </>
        )
      }

      return (
        <>
          <Text color="black60" variant="sm">
            • To pay by wire transfer, complete checkout and a member of the
            Artsy team will contact you with next steps by email.
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
        </>
      )
    case "US_BANK_ACCOUNT":
      return (
        <>
          <Text color="black60" variant="sm">
            • Search for your bank institution or select from the options below.
          </Text>
          <Text color="black60" variant="sm">
            • If you can not find your bank, please check your spelling or
            choose another payment method.
          </Text>
          <Text color="black60" variant="sm">
            • Bank transfer is powered by Stripe.
          </Text>
          <Text color="black60" variant="sm">
            • Payment processing will take 4-7 business days once the gallery
            accepts the order.
          </Text>
        </>
      )
    case "SEPA_DEBIT":
      return (
        <>
          <Flex>
            <Text color="black60" variant="sm">
              • Your bank account must be located in one of the SEPA countries.
            </Text>
            <Tooltip
              placement="top-start"
              width={400}
              content="SEPA countries: Austria, Belgium, Britain, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Monaco, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, and Switzerland."
            >
              <Clickable ml={0.5} style={{ lineHeight: 0 }}>
                <InfoCircleIcon />
              </Clickable>
            </Tooltip>
          </Flex>
          <Text color="black60" variant="sm">
            • Enter your billing address in the form below.
          </Text>
          <Text color="black60" variant="sm">
            • Payment processing will take 4-7 business days once the gallery
            accepts the order.
          </Text>
          <Text color="black60" variant="sm">
            • Bank transfer is powered by Stripe.
          </Text>
        </>
      )
    default:
      return null
  }
}
