import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2PaymentCompletedView } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentCompletedView"
import { Order2PaymentForm } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentForm"
import { useCompletePaymentData } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/useCompletePaymentData"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { Box, Flex, Text } from "@artsy/palette"
import type { Order2PaymentStep_me$key } from "__generated__/Order2PaymentStep_me.graphql"
import type { Order2PaymentStep_order$key } from "__generated__/Order2PaymentStep_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2PaymentStepProps {
  order: Order2PaymentStep_order$key
  me: Order2PaymentStep_me$key
}

export const Order2PaymentStep: React.FC<Order2PaymentStepProps> = ({
  order,
  me,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  useCompletePaymentData(orderData)

  const { confirmationToken, savedPaymentMethod, steps } = useCheckoutContext()

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.PAYMENT
  )?.state

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Box py={2} px={[2, 4]} hidden={stepState !== CheckoutStepState.UPCOMING}>
        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Payment
          </Text>
          <Text variant="sm" color="mono60">
            Options vary based on price, gallery, and location
          </Text>
        </Flex>
      </Box>

      <Box
        py={2}
        px={[2, 4]}
        hidden={stepState !== CheckoutStepState.COMPLETED}
      >
        <Order2PaymentCompletedView
          savedPaymentMethod={savedPaymentMethod}
          confirmationToken={confirmationToken}
        />
      </Box>

      <Box py={2} px={[2, 4]} hidden={stepState !== CheckoutStepState.ACTIVE}>
        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Payment
          </Text>
          <Order2PaymentForm order={orderData} me={meData} />
        </Flex>
      </Box>
    </Flex>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2PaymentStep_order on Order {
    ...useCompletePaymentData_order
    ...Order2PaymentForm_order
    internalID
    paymentMethod
    paymentMethodDetails {
      __typename
      ... on CreditCard {
        internalID
      }
      ... on BankAccount {
        internalID
      }
      ... on WireTransfer {
        isManualPayment
      }
    }
    buyerTotal {
      minor
      currencyCode
    }
    itemsTotal {
      minor
      currencyCode
    }
    shippingTotal {
      minor
    }
    taxTotal {
      minor
    }
    seller {
      __typename
      ... on Partner {
        merchantAccount {
          externalId
        }
      }
    }
  }
`

const ME_FRAGMENT = graphql`
  fragment Order2PaymentStep_me on Me {
    ...Order2PaymentForm_me
  }
`
