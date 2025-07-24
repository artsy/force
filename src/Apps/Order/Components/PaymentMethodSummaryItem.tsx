import { ApplePayDetails } from "Apps/Order/Components/ApplePayDetails"
import {
  StepSummaryItem,
  type StepSummaryItemProps,
} from "Components/StepSummaryItem"
import type { PaymentMethodSummaryItem_order$data } from "__generated__/PaymentMethodSummaryItem_order.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { BankDebitDetails } from "./BankDebitDetails"
import { CreditCardDetails } from "./CreditCardDetails"
import { WireTransferDetails } from "./WireTransferDetails"
import { GooglePayDetails } from "Apps/Order/Components/GooglePayDetails"

export const PaymentMethodSummaryItem = ({
  order: { creditCardWalletType, source, paymentMethodDetails },
  textColor = "mono100",
  withDescription = true,
  ...others
}: {
  order: PaymentMethodSummaryItem_order$data
  textColor?: string
  withDescription?: boolean
} & StepSummaryItemProps) => {
  const renderPaymentMethodSummary = () => {
    if (!!creditCardWalletType) {
      switch (creditCardWalletType) {
        case "apple_pay":
          return <ApplePayDetails textColor={textColor} />
        case "google_pay":
          return <GooglePayDetails textColor={textColor} />
        default:
          break
      }
    }
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
        return (
          <WireTransferDetails
            withDescription={withDescription}
            orderSource={source}
          />
        )
      default:
        null
    }
  }

  return (
    <StepSummaryItem {...others} data-testid="paymentSummary">
      {renderPaymentMethodSummary()}
    </StepSummaryItem>
  )
}

export const PaymentMethodSummaryItemFragmentContainer =
  createFragmentContainer(PaymentMethodSummaryItem, {
    order: graphql`
      fragment PaymentMethodSummaryItem_order on CommerceOrder {
        source
        creditCardWalletType
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
  })
