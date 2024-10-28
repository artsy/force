import {
  CommercePaymentMethodEnum,
  Payment_order$data,
} from "__generated__/Payment_order.graphql"

const initialPaymentMethods: CommercePaymentMethodEnum[] = [
  "US_BANK_ACCOUNT",
  "SEPA_DEBIT",
  "CREDIT_CARD",
  "WIRE_TRANSFER",
]

export const getInitialPaymentMethodValue = ({
  paymentSet,
  paymentMethod,
  availablePaymentMethods,
}: Payment_order$data): CommercePaymentMethodEnum =>
  paymentSet
    ? paymentMethod!
    : initialPaymentMethods.find(method =>
        availablePaymentMethods.includes(method)
      )!
