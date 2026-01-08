import ApplePayMarkIcon from "@artsy/icons/ApplePayMarkIcon"
import GooglePayIcon from "@artsy/icons/GooglePayIcon"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import type {
  OrderDetailsPaymentInfo_order$data,
  OrderDetailsPaymentInfo_order$key,
} from "__generated__/OrderDetailsPaymentInfo_order.graphql"
import type React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface OrderDetailsPaymentInfoProps {
  order: OrderDetailsPaymentInfo_order$key
}

export const OrderDetailsPaymentInfo: React.FC<
  OrderDetailsPaymentInfoProps
> = ({ order }) => {
  const orderData = useFragment(fragment, order)

  const { Icon, text } = getPaymentMethodContent(orderData)

  if (!Icon) {
    return null
  }

  return (
    <Box px={[2, 4]} py={2} backgroundColor="mono0">
      <Text variant="sm" fontWeight="bold" color="mono100">
        Payment method
      </Text>

      <Spacer y={0.5} />

      <Flex alignItems="center">
        <Icon mr={1} width={18} height={18} />

        <Text variant="sm" color="mono100">
          {text}
        </Text>
      </Flex>
    </Box>
  )
}

const getPaymentMethodContent = (
  order: NonNullable<OrderDetailsPaymentInfo_order$data>,
) => {
  const { creditCardWalletType, paymentMethodDetails } = order

  if (creditCardWalletType) {
    switch (creditCardWalletType) {
      case "APPLE_PAY":
        return { Icon: ApplePayMarkIcon, text: "Apple Pay" }
      case "GOOGLE_PAY":
        return { Icon: GooglePayIcon, text: "Google Pay" }
      default:
        return { Icon: null }
    }
  }

  switch (paymentMethodDetails?.__typename) {
    case "CreditCard":
      const { brand, expirationMonth, expirationYear, lastDigits } =
        paymentMethodDetails
      const formattedExpDate = `${expirationMonth.toString().padStart(2, "0")}/${expirationYear.toString().slice(-2)}`

      return {
        Icon: props => <BrandCreditCardIcon type={brand as Brand} {...props} />,
        text: `•••• ${lastDigits}  Exp ${formattedExpDate}`,
      }

    case "BankAccount":
      return {
        Icon: InstitutionIcon,
        text: `Bank transfer •••• ${paymentMethodDetails.last4}`,
      }

    case "WireTransfer":
      return {
        Icon: InstitutionIcon,
        text: "Wire transfer",
      }

    default:
      return {
        Icon: null,
      }
  }
}

const fragment = graphql`
  fragment OrderDetailsPaymentInfo_order on Order {
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
`
