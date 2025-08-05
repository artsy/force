import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import {
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { Order2DeliveryOptionsCompletedView_order$key } from "__generated__/Order2DeliveryOptionsCompletedView_order.graphql"
import { useCallback } from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface Order2DeliveryOptionsCompletedViewProps {
  order: Order2DeliveryOptionsCompletedView_order$key
}

export const Order2DeliveryOptionsCompletedView: React.FC<
  Order2DeliveryOptionsCompletedViewProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const { editDeliveryOption, checkoutTracking } = useCheckoutContext()

  const selectedFulfillmentOption = orderData.selectedFulfillmentOption

  const label = deliveryOptionLabel(selectedFulfillmentOption?.type)
  const timeEstimate = deliveryOptionTimeEstimate(
    selectedFulfillmentOption?.type,
  )
  const [prefix, timeRange] = timeEstimate || []

  const onClickEdit = useCallback(() => {
    checkoutTracking.clickedChangePaymentMethod()

    editDeliveryOption()
  }, [checkoutTracking, editDeliveryOption])

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 4]}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Shipping method
          </Text>
        </Flex>
        <Clickable
          textDecoration="underline"
          cursor="pointer"
          type="button"
          onClick={onClickEdit}
        >
          <Text variant="xs" fontWeight="normal" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>
      <Spacer y={1} />
      <Box ml="30px" mt={1}>
        <Text variant="sm-display" color="mono100">
          {label}
        </Text>
        {timeEstimate && (
          <Text variant="xs" color="mono60">
            {prefix} <strong>{timeRange}</strong>
          </Text>
        )}
      </Box>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2DeliveryOptionsCompletedView_order on Order {
    internalID
    selectedFulfillmentOption {
      type
    }
  }
`
