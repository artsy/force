import { Flex, Text } from "@artsy/palette"
import type { Order2DeliveryOptionsForm_order$data } from "__generated__/Order2DeliveryOptionsForm_order.graphql"
import {
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"

type DeliveryOption =
  Order2DeliveryOptionsForm_order$data["fulfillmentOptions"][number]

interface SingleShippingOptionProps {
  option: DeliveryOption
}

export const SingleShippingOption = ({ option }: SingleShippingOptionProps) => {
  const label = deliveryOptionLabel(option.type, option.amount?.minor)
  const timeEstimate = deliveryOptionTimeEstimate(option.type)
  const [prefix, timeRange] = timeEstimate || []

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text variant="sm" color="mono100">
          {label}
        </Text>
        <Text variant="sm" color="mono100">
          {option.amount?.display}
        </Text>
      </Flex>
      {timeEstimate && (
        <Text variant="sm" color="mono60">
          {prefix} <strong>{timeRange}</strong>
        </Text>
      )}
    </Flex>
  )
}
