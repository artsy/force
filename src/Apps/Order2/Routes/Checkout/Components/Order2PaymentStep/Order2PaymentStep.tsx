import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { Order2PaymentForm } from "Apps/Order2/Routes/Checkout/Components/Order2PaymentStep/Order2PaymentForm"
import type { Order2PaymentStep_order$key } from "__generated__/Order2PaymentStep_order.graphql"
import { graphql, useFragment } from "react-relay"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2PaymentCompletedView } from "Apps/Order2/Routes/Checkout/Components/Order2PaymentStep/Order2PaymentCompletedView"

interface Order2PaymentStepProps {
  order: Order2PaymentStep_order$key
}

export const Order2PaymentStep: React.FC<Order2PaymentStepProps> = ({
  order,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const { editPayment, confirmationToken, steps, setConfirmationToken } =
    useCheckoutContext()!

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.PAYMENT,
  )?.state

  return (
    <Flex
      data-testid="PaymentStep"
      flexDirection="column"
      backgroundColor="mono0"
    >
      <Box p={2} hidden={stepState !== CheckoutStepState.UPCOMING}>
        <Flex flexDirection="column">
          <Text variant="sm-display" fontWeight={500} color="mono100">
            Payment
          </Text>
          <Text variant="xs" color="mono60">
            Options vary based on price, gallery, and location
          </Text>
        </Flex>
      </Box>

      {/* This is used instead of hidden just to force a clean payment element on edit */}
      {stepState === CheckoutStepState.COMPLETED && (
        <Box>
          <Order2PaymentCompletedView
            confirmationToken={confirmationToken}
            onClickEdit={() => editPayment()}
          />
        </Box>
      )}

      {stepState === CheckoutStepState.ACTIVE && (
        <Box p={2}>
          <Flex flexDirection="column">
            <Text variant="sm-display" fontWeight={500} color="mono100">
              Payment
            </Text>
            <Text variant="xs" color="mono60">
              Options vary based on price, gallery, and location
            </Text>
            <Spacer y={2} />
            <Order2PaymentForm
              order={orderData}
              setConfirmationToken={setConfirmationToken}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2PaymentStep_order on Order {
    internalID
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
