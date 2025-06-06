import { Box, Flex, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { Order2DeliveryOptionsStep_order$key } from "__generated__/Order2DeliveryOptionsStep_order.graphql"

interface Order2DeliveryOptionsStepProps {
  order: Order2DeliveryOptionsStep_order$key
}

export const Order2DeliveryOptionsStep: React.FC<
  Order2DeliveryOptionsStepProps
> = ({ order }) => {
  const { activeFulfillmentDetailsTab } = useCheckoutContext()!

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Box p={2} hidden={activeFulfillmentDetailsTab !== "DELIVERY"}>
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
