import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "v2/__generated__/Payment_order.graphql"

const initialPaymentMethods: CommercePaymentMethodEnum[] = [
  "US_BANK_ACCOUNT",
  "CREDIT_CARD",
]

export const isPaymentSet = (
  paymentMethodDetails: Payment_order["paymentMethodDetails"]
): boolean => {
  switch (paymentMethodDetails?.__typename) {
    case "CreditCard":
      return !!paymentMethodDetails.id
    case "BankAccount":
      return !!paymentMethodDetails.id
    case "WireTransfer":
      return true
    default:
      return false
  }
}

export const getInitialPaymentMethodValue = ({
  paymentMethod,
  paymentMethodDetails,
  availablePaymentMethods,
}: Payment_order): CommercePaymentMethodEnum =>
  isPaymentSet(paymentMethodDetails)
    ? paymentMethod!
    : initialPaymentMethods.find(method =>
        availablePaymentMethods.includes(method)
      )!
