import { Flex, Spacer, Text } from "@artsy/palette"
import { deliveryOptionLabel } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"

interface SingleShippingOptionProps {
  option: {
    type?: string | null
    amount?: {
      display?: string | null
    } | null
  }
}

export const SingleShippingOption = ({ option }: SingleShippingOptionProps) => {
  const label = deliveryOptionLabel(option.type)

  // TODO: Extract option into shared component so completed view can take advantage, probably using MP's labels
  return (
    <Flex flexDirection="column">
      <Spacer y={0.5} />
      <Flex justifyContent="space-between">
        <Text variant="sm-display" color="mono100">
          {label}
        </Text>
        <Text variant="sm-display" color="mono100">
          {option.amount?.display}
        </Text>
      </Flex>
      <Text variant="xs" color="mono60">
        Estimated to ship between <strong>TODO 28-30</strong>
      </Text>
    </Flex>
  )
}
