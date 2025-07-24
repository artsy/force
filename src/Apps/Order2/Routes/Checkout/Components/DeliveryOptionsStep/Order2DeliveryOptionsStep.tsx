import { Box, Flex, Text } from "@artsy/palette"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2DeliveryOptionsCompletedView } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsCompletedView"
import { Order2DeliveryOptionsForm } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsForm"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { Order2DeliveryOptionsStep_order$key } from "__generated__/Order2DeliveryOptionsStep_order.graphql"
import { graphql, useFragment } from "react-relay"

type Order2DeliveryOptionsStepProps = {
  order: Order2DeliveryOptionsStep_order$key
}

export const Order2DeliveryOptionsStep: React.FC<
  Order2DeliveryOptionsStepProps
> = ({ order }) => {
  const { steps } = useCheckoutContext()
  const orderData = useFragment(FRAGMENT, order)

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.DELIVERY_OPTION,
  )?.state

  if (stepState === CheckoutStepState.HIDDEN) {
    return null
  }

  if (stepState === CheckoutStepState.ACTIVE) {
    return <Order2DeliveryOptionsForm order={orderData} />
  }

  if (stepState === CheckoutStepState.COMPLETED) {
    return <Order2DeliveryOptionsCompletedView order={orderData} />
  }

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Box py={2} px={[2, 4]} data-testid="DeliveryOptionsStep">
        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Shipping method
          </Text>
          <Text variant={["xs", "xs", "sm"]} color="mono60">
            Methods vary based on location and artwork size
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2DeliveryOptionsStep_order on Order {
    internalID
    ...Order2DeliveryOptionsForm_order
    ...Order2DeliveryOptionsCompletedView_order
    selectedFulfillmentOption {
      type
      amount {
        display
      }
    }
  }
`
