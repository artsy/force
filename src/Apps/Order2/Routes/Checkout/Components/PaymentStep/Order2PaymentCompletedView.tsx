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
  const { editPayment, checkoutTracking } = useCheckoutContext()

  const onClickEdit = () => {
    checkoutTracking.clickedChangePaymentMethod()
    editPayment()
  }

  const paymentMethodDetails = orderData.paymentMethodDetails
  const paymentType = paymentMethodDetails?.__typename

  const isCreditCard = paymentType === "CreditCard"
  const isBankAccount =
    paymentType === "BankAccount" &&
    orderData.paymentMethod === "US_BANK_ACCOUNT"
  const isSEPA =
    paymentType === "BankAccount" && orderData.paymentMethod === "SEPA_DEBIT"
  const isWireTransfer = paymentType === "WireTransfer"

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
        {(isBankAccount || isSEPA) &&
          paymentMethodDetails?.__typename === "BankAccount" && (
            <>
              <InstitutionIcon
                fill="mono100"
                width="24px"
                height="24px"
                mr={1}
              />
              <Text variant="sm-display">
                •••• {paymentMethodDetails.last4}
              </Text>
            </>
          )}
        {isCreditCard && paymentMethodDetails?.__typename === "CreditCard" && (
          <>
            <BrandCreditCardIcon
              mr={1}
              type={paymentMethodDetails.brand as Brand}
              width="24px"
              height="24px"
            />
            <Text variant="sm-display">
              •••• {paymentMethodDetails.lastDigits}
            </Text>
          </>
        )}
        {isWireTransfer && (
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
