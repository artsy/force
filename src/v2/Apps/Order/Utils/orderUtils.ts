import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "v2/__generated__/Payment_order.graphql"

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
    : availablePaymentMethods.includes("US_BANK_ACCOUNT")
    ? "US_BANK_ACCOUNT"
    : "CREDIT_CARD"
