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
  order: { creditCard, paymentMethod },
  textColor = "black100",
  currentStep,
  ...others
}: {
  order: PaymentMethodSummaryItem_order
  textColor?: string
  currentStep?: string
} & StepSummaryItemProps) => {
  const cardInfoWithTextColor = {
    ...creditCard!,
    ...{ textColor: textColor },
  }

  const renderPaymentMethodSummary = () => {
    switch (paymentMethod) {
      case "CREDIT_CARD":
        return <CreditCardDetails {...cardInfoWithTextColor} />
      case "US_BANK_ACCOUNT":
        return <BankDebitDetails {...cardInfoWithTextColor} />
      case "WIRE_TRANSFER":
        return <WireTransferDetails currentStep={currentStep} />
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
