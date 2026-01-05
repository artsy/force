import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import type { Order2PaymentCompletedView_order$key } from "__generated__/Order2PaymentCompletedView_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2PaymentCompletedViewProps {
  order: Order2PaymentCompletedView_order$key
}

export const Order2PaymentCompletedView: React.FC<
  Order2PaymentCompletedViewProps
> = ({ order }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const { editPayment, checkoutTracking, confirmationToken } =
    useCheckoutContext()

  const onClickEdit = () => {
    checkoutTracking.clickedChangePaymentMethod()
    editPayment()
  }

  const savedPaymentMethod = orderData.paymentMethodDetails
  const paymentPreview = confirmationToken?.paymentMethodPreview

  const getDisplayDetails = () => {
    // For new payment methods, use preview data
    if (paymentPreview) {
      const isCard = paymentPreview.__typename === "Card"
      const isUSBankAccount = paymentPreview.__typename === "USBankAccount"

      return {
        cardBrand: isCard ? paymentPreview.displayBrand : null,
        last4:
          paymentPreview.__typename !== "%other" ? paymentPreview.last4 : null,
        bankName: isUSBankAccount ? paymentPreview.bankName : null,
      }
    }

    // For saved payment methods, use saved details
    return {
      cardBrand:
        savedPaymentMethod?.__typename === "CreditCard"
          ? savedPaymentMethod.brand
          : null,
      last4:
        savedPaymentMethod?.__typename === "CreditCard"
          ? savedPaymentMethod.lastDigits
          : savedPaymentMethod?.__typename === "BankAccount"
            ? savedPaymentMethod.last4
            : null,
      bankName: null,
    }
  }

  const details = getDisplayDetails()
  const paymentMethod = orderData.paymentMethod

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <Text
            variant={["sm-display", "sm-display", "md"]}
            fontWeight={["bold", "bold", "normal"]}
            color="mono100"
          >
            Payment
          </Text>
        </Flex>
        <Clickable
          textDecoration="underline"
          cursor="pointer"
          type="button"
          onClick={onClickEdit}
        >
          <Text variant="sm" fontWeight="normal" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>
      <Flex alignItems="center" ml="30px" mt={1}>
        {/* Bank Account (ACH or SEPA) */}
        {(paymentMethod === "US_BANK_ACCOUNT" ||
          paymentMethod === "SEPA_DEBIT") &&
          details.last4 && (
            <>
              <InstitutionIcon
                fill="mono100"
                width="24px"
                height="24px"
                mr={1}
              />
              <Text variant="sm-display">
                {details.bankName && `${details.bankName} `}
                •••• {details.last4}
              </Text>
            </>
          )}

        {/* Credit Card */}
        {paymentMethod === "CREDIT_CARD" &&
          details.cardBrand &&
          details.last4 && (
            <>
              <BrandCreditCardIcon
                mr={1}
                type={details.cardBrand as Brand}
                width="24px"
                height="24px"
              />
              <Text variant="sm-display">•••• {details.last4}</Text>
            </>
          )}

        {/* Wire Transfer */}
        {paymentMethod === "WIRE_TRANSFER" && (
          <>
            <InstitutionIcon fill="mono100" width="24px" height="24px" mr={1} />
            <Text variant="sm-display">Wire Transfer</Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2PaymentCompletedView_order on Order {
    paymentMethod
    paymentMethodDetails {
      __typename
      ... on CreditCard {
        brand
        lastDigits
      }
      ... on BankAccount {
        last4
      }
      ... on WireTransfer {
        isManualPayment
      }
    }
  }
`
