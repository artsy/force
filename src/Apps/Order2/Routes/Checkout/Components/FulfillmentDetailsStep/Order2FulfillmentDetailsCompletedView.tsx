import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Text } from "@artsy/palette"

interface Order2FulfillmentDetailsCompletedViewProps {
  fulfillmentDetails: any
  fulfillmentOption: any
  onClickEdit: () => void
}
export const Order2FulfillmentDetailsCompletedView: React.FC<
  Order2FulfillmentDetailsCompletedViewProps
> = ({ fulfillmentOption, onClickEdit }) => {
  if (fulfillmentOption?.type === "PICKUP") {
    return (
      <Flex alignItems="flex-start">
        <CheckmarkIcon
          flexShrink={0}
          height="20px"
          width="20px"
          fill="mono100"
        />
        <Box flexGrow={1} mx={0.5}>
          <Text variant="sm-display" fontWeight="500" color="mono100">
            Pickup
          </Text>
          <Text variant="xs" fontWeight="400" color="mono100">
            After your order is confirmed, a specialist will contact you within
            2 business days to coordinate pickup.
          </Text>
        </Box>
        <Clickable
          textDecoration="underline"
          flexShrink={0}
          onClick={onClickEdit}
        >
          <Text variant="xs" fontWeight="400" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>
    )
  }

  return (
    <Flex>
      <CheckmarkIcon height={20} width={20} fill="mono100" />
      <Box flexGrow={1} mx={0.5} />
      <Text variant="md" fontWeight="500" color="mono100">
        Delivery
      </Text>
      <Text variant="xs" fontWeight="400" color="mono100">
        This is just some text to show the delivery details. It's not ready yet.
      </Text>
    </Flex>
  )
}
