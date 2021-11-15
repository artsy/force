import { CreditCardSummaryItem_order } from "v2/__generated__/CreditCardSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardDetails } from "./CreditCardDetails"

const CreditCardSummaryItem = ({
  order: { creditCard },
  ...others
}: {
  order: CreditCardSummaryItem_order
} & StepSummaryItemProps) => {
  return (
    <StepSummaryItem {...others}>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <CreditCardDetails {...creditCard} />
    </StepSummaryItem>
  )
}

export const CreditCardSummaryItemFragmentContainer = createFragmentContainer(
  CreditCardSummaryItem,
  {
    order: graphql`
      fragment CreditCardSummaryItem_order on CommerceOrder {
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
