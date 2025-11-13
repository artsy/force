import type {
  CommercePaymentMethodEnum,
  Payment_order$data,
} from "__generated__/Payment_order.graphql"

const orderedPaymentMethods: CommercePaymentMethodEnum[] = [
  "CREDIT_CARD",
  "US_BANK_ACCOUNT",
  "SEPA_DEBIT",
  "WIRE_TRANSFER",
]

export const getInitialPaymentMethodValue = ({
  paymentSet,
  paymentMethod,
  availablePaymentMethods,
}: Payment_order$data): CommercePaymentMethodEnum | undefined => {
  if (paymentSet && paymentMethod) {
    return paymentMethod
  }

  if (availablePaymentMethods.length > 1) {
    return undefined
  }

  return orderedPaymentMethods.find(method =>
    availablePaymentMethods.includes(method)
  )
}
