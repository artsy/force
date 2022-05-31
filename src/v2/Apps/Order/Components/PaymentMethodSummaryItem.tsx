import { PaymentMethodSummaryItem_order } from "v2/__generated__/PaymentMethodSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardDetails } from "./CreditCardDetails"

const PaymentMethodSummaryItem = ({
  order: { creditCard },
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

  return (
    <StepSummaryItem {...others}>
      <CreditCardDetails {...cardInfoWithTextColor} />
    </StepSummaryItem>
  )
}

export const PaymentMethodSummaryItemFragmentContainer = createFragmentContainer(
  PaymentMethodSummaryItem,
  {
    order: graphql`
      fragment PaymentMethodSummaryItem_order on CommerceOrder {
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
