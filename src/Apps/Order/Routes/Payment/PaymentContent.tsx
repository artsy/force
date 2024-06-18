import { FC, RefObject, ReactElement, useEffect, useRef } from "react"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType } from "@artsy/cohesion"
import {
  Clickable,
  Spacer,
  BorderedRadio,
  RadioGroup,
  Text,
  RadioProps,
  Tooltip,
  Flex,
} from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
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
import { RouterLink } from "System/Components/RouterLink"
import InfoIcon from "@artsy/icons/InfoIcon"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import UnknownCardIcon from "@artsy/icons/UnknownCardIcon"
import { Jump } from "Utils/Hooks/useJump"

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
        flow: mode,
        context_page_owner_type: OwnerType.ordersPayment,
        order_id: internalID,
        amount: buyerTotal,
        currency: currencyCode,
      }
      tracking.trackEvent(event)
    }
  }, [order, selectedPaymentMethod, tracking])

  return (
    <>
      {order.availablePaymentMethods.length > 1 && (
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
          <Jump id="paymentDetailsTop" />
          <Text variant="lg-display">Payment details</Text>
          <Spacer y={2} />
        </>
      )}

      {/* Credit card */}
      <Collapse open={selectedPaymentMethod === "CREDIT_CARD"}>
        <Flex
          style={{
            display:
              selectedPaymentMethod === "CREDIT_CARD" ? "inline" : "none",
          }}
        >
          <CreditCardPickerFragmentContainer
            commitMutation={commitMutation}
            me={me}
            order={order}
            innerRef={CreditCardPicker}
          />
        </Flex>
        <Spacer y={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={onSetPayment}
          tabIndex={selectedPaymentMethod === "CREDIT_CARD" ? 0 : -1}
        />
        <Spacer y={2} />
      </Collapse>

      {/* US Bank transfer */}
      <Collapse open={selectedPaymentMethod === "US_BANK_ACCOUNT"}>
        {getPaymentMethodInfo(
          selectedPaymentMethod,
          order.source,
          order.availablePaymentMethods
        )}
        <Spacer y={2} />
        {selectedPaymentMethod === "US_BANK_ACCOUNT" && (
          <Flex
            style={{
              display:
                selectedPaymentMethod === "US_BANK_ACCOUNT" ? "inline" : "none",
            }}
          >
            <BankAccountPickerFragmentContainer
              me={me}
              order={order}
              onError={props.onError}
            />
          </Flex>
        )}
      </Collapse>

      {/* SEPA bank transfer */}
      <Collapse open={selectedPaymentMethod === "SEPA_DEBIT"}>
        {getPaymentMethodInfo(
          selectedPaymentMethod,
          order.source,
          order.availablePaymentMethods
        )}
        <Spacer y={2} />
        <Flex
          style={{
            display: selectedPaymentMethod === "SEPA_DEBIT" ? "inline" : "none",
          }}
        >
          {selectedPaymentMethod === "SEPA_DEBIT" && (
            <BankAccountPickerFragmentContainer
              me={me}
              order={order}
              onError={props.onError}
            />
          )}
        </Flex>
      </Collapse>

      {/* Wire transfer */}
      <Collapse open={selectedPaymentMethod === "WIRE_TRANSFER"}>
        {getPaymentMethodInfo(
          selectedPaymentMethod,
          order.source,
          order.availablePaymentMethods
        )}
        <Spacer y={4} />
        <SaveAndContinueButton
          media={{ greaterThan: "xs" }}
          onClick={onSetPayment}
          tabIndex={selectedPaymentMethod === "WIRE_TRANSFER" ? 0 : -1}
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
): ReactElement<RadioProps<string>>[] => {
  let paymentMethod: CommercePaymentMethodEnum = "CREDIT_CARD"
  const paymentMethods: Array<ReactElement<RadioProps<string>>> = []

  if (availablePaymentMethods.includes("CREDIT_CARD")) {
    paymentMethods.push(
      <BorderedRadio
        data-test-id="credit-card"
        key="CREDIT_CARD"
        value={paymentMethod}
        label={
          <>
            <UnknownCardIcon fill="black100" />
            <Text variant="sm-display" ml={0.5}>
              Credit card
            </Text>
          </>
        }
      />
    )
  }

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
              ACH bank transfer
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
          Your bank account must be denominated in EUR
        </Text>
      </BorderedRadio>
    )
  }

  return paymentMethods
}

const getPaymentMethodInfo = (
  paymentMethod: CommercePaymentMethodEnum | string,
  orderSource?: string,
  availablePaymentMethods?: readonly CommercePaymentMethodEnum[]
) => {
  switch (paymentMethod) {
    case "WIRE_TRANSFER":
      if (orderSource === "private_sale") {
        return (
          <>
            {availablePaymentMethods?.length === 1 && (
              <Text variant="lg-display">Wire transfer payment details</Text>
            )}
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
          {availablePaymentMethods?.length === 1 && (
            <Text variant="lg-display">Wire transfer payment details</Text>
          )}
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
            <RouterLink inline to="mailto:orders@artsy.net">
              orders@artsy.net
            </RouterLink>
          </Text>
        </>
      )
    case "US_BANK_ACCOUNT":
      return (
        <>
          {availablePaymentMethods?.length === 1 && (
            <Text variant="lg-display">Bank transfer payment details</Text>
          )}
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
          {availablePaymentMethods?.length === 1 && (
            <Text variant="lg-display">SEPA bank transfer payment details</Text>
          )}
          <Flex>
            <Text color="black60" variant="sm">
              • Your bank account must be denominated in EUR and located in one
              of the SEPA countries.
            </Text>
            <Tooltip
              placement="top-start"
              width={400}
              content="SEPA countries: Austria, Belgium, Britain, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Monaco, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, and Switzerland."
            >
              <Clickable ml={0.5} style={{ lineHeight: 0 }}>
                <InfoIcon />
              </Clickable>
            </Tooltip>
          </Flex>
          <Text color="black60" variant="sm">
            • Enter your billing address in the form below.
          </Text>
          <Text color="black60" variant="sm">
            • Once your order is accepted, please allow 7-10 business days for
            processing your payment. After processing, your order will be
            prepared for pickup or packed and shipped, depending on your chosen
            delivery type.
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
