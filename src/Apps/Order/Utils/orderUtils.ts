import {
  CommercePaymentMethodEnum,
  Payment_order$data,
} from "__generated__/Payment_order.graphql"
import { BankAccountSelection } from "../Routes/Payment/index"

const initialPaymentMethods: CommercePaymentMethodEnum[] = [
  "US_BANK_ACCOUNT",
  "SEPA_DEBIT",
  "CREDIT_CARD",
]

export const isPaymentSet = (
  paymentMethodDetails: Payment_order$data["paymentMethodDetails"]
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
}: Payment_order$data): CommercePaymentMethodEnum =>
  isPaymentSet(paymentMethodDetails)
    ? paymentMethod!
    : initialPaymentMethods.find(method =>
        availablePaymentMethods.includes(method)
      )!

export const getInitialBankAccountSelection = (
  { bankAccountId },
  bankAccountsArray
): BankAccountSelection => {
  if (bankAccountId) {
    return {
      type: "existing",
      id: bankAccountId,
    }
  } else {
    return bankAccountsArray.length > 0
      ? {
          type: "existing",
          id: bankAccountsArray[0]?.internalID!,
        }
      : { type: "new" }
  }
}
