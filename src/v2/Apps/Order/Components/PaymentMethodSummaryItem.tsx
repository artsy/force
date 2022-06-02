import { PaymentMethodSummaryItem_order } from "v2/__generated__/PaymentMethodSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { CreditCardDetails } from "./CreditCardDetails"
import { BankDebitDetails } from "./BankDebitDetails"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
// TODO: uncomment when we get paymentMethod from API
// import { WireTransferDetails } from "./WireTransferDetails"
// import { PaymentMethods } from "../OrderApp"

export const PaymentMethodSummaryItem = ({
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
  const isACHEnabled = useFeatureFlag("stripe_ACH")

  return (
    <StepSummaryItem {...others}>
      {creditCard && <CreditCardDetails {...cardInfoWithTextColor} />}
      {isACHEnabled && !creditCard && (
        <BankDebitDetails {...cardInfoWithTextColor} />
      )}
      {/* {paymentMethod === PaymentMethods.WireTransfer &&  <WireTransferDetails />} */}
    </StepSummaryItem>
  )
}

export const PaymentMethodSummaryItemFragmentContainer = createFragmentContainer(
  PaymentMethodSummaryItem,
  {
    order: graphql`
      fragment PaymentMethodSummaryItem_order on CommerceOrder {
        # TODO: retrieve payment method
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
