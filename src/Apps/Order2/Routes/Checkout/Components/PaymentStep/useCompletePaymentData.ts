import type { useCompletePaymentData_order$key } from "__generated__/useCompletePaymentData_order.graphql"
import { graphql, useFragment } from "react-relay"

/**
 * Hook that checks if payment step is complete.
 * Returns true if complete, null if not complete.
 * Note: The completed view props come from checkout context (confirmationToken, savedPaymentMethod),
 * not from this hook, since payment data is stored in context rather than the order fragment.
 */
export const useCompletePaymentData = (
  order: useCompletePaymentData_order$key,
): true | null => {
  const orderData = useFragment(FRAGMENT, order)

  if (!orderData.paymentMethod) {
    return null
  }

  if (
    !orderData.paymentMethodDetails ||
    (typeof orderData.paymentMethodDetails === "object" &&
      Object.keys(orderData.paymentMethodDetails).length === 0)
  ) {
    return null
  }

  return true
}

const FRAGMENT = graphql`
  fragment useCompletePaymentData_order on Order {
    paymentMethod
    paymentMethodDetails {
      __typename
      ... on CreditCard {
        internalID
      }
      ... on BankAccount {
        internalID
      }
      ... on WireTransfer {
        isManualPayment
      }
    }
  }
`
