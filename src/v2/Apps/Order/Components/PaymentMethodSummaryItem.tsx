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
  const cardInfoWithTextColor = {
    ...paymentMethodDetails,
    ...{ textColor: textColor },
  }

  const renderPaymentMethodSummary = () => {
    switch (paymentMethod) {
      case "CREDIT_CARD":
        return <CreditCardDetails {...cardInfoWithTextColor} />
      case "US_BANK_ACCOUNT":
        return <BankDebitDetails {...paymentMethodDetails} />
      case "WIRE_TRANSFER":
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
        }
      }
    `,
  }
)
