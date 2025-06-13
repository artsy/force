import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"

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
      <Flex flexDirection="column" backgroundColor="mono0">
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <CheckmarkIcon fill="mono100" />
            <Spacer x={1} />
            <Text
              variant={["sm-display", "md"]}
              fontWeight="400"
              color="mono100"
            >
              Pickup
            </Text>
          </Flex>
          <Clickable
            textDecoration="underline"
            cursor="pointer"
            type="button"
            onClick={onClickEdit}
          >
            <Text variant="xs" fontWeight="400" color="mono100">
              Edit
            </Text>
          </Clickable>
        </Flex>
        <Flex alignItems="center" ml="30px" mt={1}>
          <Text variant="xs" fontWeight="400" color="mono100">
            After your order is confirmed, a specialist will contact you within
            2 business days to coordinate pickup.
          </Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex>
      <CheckmarkIcon height={20} width={20} fill="mono100" />
      <Box flexGrow={1} mx={0.5} />
      <Text variant={["sm-display", "md"]} fontWeight="400" color="mono100">
        Delivery
      </Text>
      <Text variant="xs" fontWeight="400" color="mono100">
        This is just some text to show the delivery details. It's not ready yet.
      </Text>
    </Flex>
  )
}
