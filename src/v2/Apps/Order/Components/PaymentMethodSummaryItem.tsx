import { PaymentMethodSummaryItem_order } from "v2/__generated__/PaymentMethodSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardDetails } from "./CreditCardDetails"
import { BankDebitDetails } from "./BankDebitDetails"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { WireTransferDetails } from "./WireTransferDetails"

export const PaymentMethodSummaryItem = ({
  order: { creditCard, paymentMethod },
  textColor = "black100",
  ...others
}: {
  order: PaymentMethodSummaryItem_order
  textColor?: string
} & StepSummaryItemProps) => {
  const cardInfoWithTextColor = {
    ...creditCard!,
    ...{ textColor: textColor },
  }
  const isACHEnabled = useFeatureFlag("stripe_ACH")
  const isWireTransferEnabled = useFeatureFlag("wire_transfer")

  return (
    <StepSummaryItem {...others}>
      {creditCard ? (
        <CreditCardDetails {...cardInfoWithTextColor} />
      ) : isACHEnabled && paymentMethod === "US_BANK_ACCOUNT" ? (
        <BankDebitDetails {...cardInfoWithTextColor} />
      ) : isWireTransferEnabled && paymentMethod === "WIRE_TRANSFER" ? (
        <WireTransferDetails />
      ) : null}
    </StepSummaryItem>
  )
}

export const PaymentMethodSummaryItemFragmentContainer = createFragmentContainer(
  PaymentMethodSummaryItem,
  {
    order: graphql`
      fragment PaymentMethodSummaryItem_order on CommerceOrder {
        paymentMethod
        creditCard {
          brand
          lastDigits
          expirationYear
          expirationMonth
        }
      }
    `,
  }
)
