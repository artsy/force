import { Box, Flex, Text } from "@artsy/palette"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"

interface Order2DeliveryOptionsStepProps {}

export const Order2DeliveryOptionsStep: React.FC<
  Order2DeliveryOptionsStepProps
> = () => {
  const { steps } = useCheckoutContext()

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.DELIVERY_OPTION,
  )?.state

  if (stepState !== CheckoutStepState.UPCOMING) {
    return null
  }

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Box p={2} data-testid="DeliveryOptionsStep">
        <Flex flexDirection="column">
          <Text variant="sm-display" fontWeight="bold" color="mono100">
            Shipping method
          </Text>
          <Text variant={["xs", "xs", "sm"]} color="mono60">
            Options vary based on address and artwork size
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}
