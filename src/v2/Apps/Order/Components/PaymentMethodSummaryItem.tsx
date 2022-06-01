import { PaymentMethodSummaryItem_order } from "v2/__generated__/PaymentMethodSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardDetails } from "./CreditCardDetails"
import { BankDebitDetails } from "./BankDebitDetails"

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

  // TODO: check paymentMethod value from CommerceOrder to conditioanlly
  // render details.
  return (
    <StepSummaryItem {...others}>
      {creditCard && <CreditCardDetails {...cardInfoWithTextColor} />}
      {!creditCard && <BankDebitDetails {...cardInfoWithTextColor} />}
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
