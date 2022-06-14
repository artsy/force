import { PaymentMethodSummaryItem_order } from "v2/__generated__/PaymentMethodSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardDetails } from "./CreditCardDetails"
import { BankDebitDetails } from "./BankDebitDetails"
import { WireTransferDetails } from "./WireTransferDetails"

export const PaymentMethodSummaryItem = ({
  order: { paymentMethod, paymentMethodDetails },
  textColor = "black100",
  withDescription = true,
  ...others
}: {
  order: PaymentMethodSummaryItem_order
  textColor?: string
  withDescription?: boolean
} & StepSummaryItemProps) => {
  const renderPaymentMethodSummary = () => {
    switch (paymentMethodDetails?.__typename) {
      case "CreditCard":
        const cardInfoWithTextColor = {
          ...paymentMethodDetails,
          ...{ textColor: textColor },
        }
        return <CreditCardDetails {...cardInfoWithTextColor} />
      case "BankAccount":
        return <BankDebitDetails {...paymentMethodDetails} />
      case "WireTransfer":
        return <WireTransferDetails withDescription={withDescription} />
      default:
        null
    }
  }

  return (
    <StepSummaryItem {...others}>
      {renderPaymentMethodSummary()}
    </StepSummaryItem>
  )
}

export const PaymentMethodSummaryItemFragmentContainer = createFragmentContainer(
  PaymentMethodSummaryItem,
  {
    order: graphql`
      fragment PaymentMethodSummaryItem_order on CommerceOrder {
        paymentMethod
        paymentMethodDetails {
          __typename
          ... on CreditCard {
            brand
            lastDigits
            expirationYear
            expirationMonth
          }
          ... on BankAccount {
            last4
          }
          ... on WireTransfer {
            isManualPayment
          }
        }
      }
    `,
  }
)
