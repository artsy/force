import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
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
  const { editDeliveryOptions, checkoutTracking } = useCheckoutContext()

  const selectedFulfillmentOptionType =
    orderData.selectedFulfillmentOption?.type

  const amount = orderData.selectedFulfillmentOption?.amount?.display || null

  const isFlatShipping = ["DOMESTIC_FLAT", "INTERNATIONAL_FLAT"].includes(
    selectedFulfillmentOptionType || "",
  )
  const label: string = isFlatShipping
    ? "Flat rate shipping"
    : "Shipping somehow"

  const onClickEdit = useCallback(() => {
    checkoutTracking.clickedChangePaymentMethod()

    editDeliveryOptions()
  }, [checkoutTracking, editDeliveryOptions])

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
      <Flex alignItems="center">
        <Spacer y={0.5} />
        <Flex justifyContent="space-between">
          <Text variant="sm-display" color="mono100">
            {label}
          </Text>
          <Text variant="sm-display" color="mono100">
            {amount}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2DeliveryOptionsCompletedView_order on Order {
    internalID
    selectedFulfillmentOption {
      type
      amount {
        display
      }
    }
  }
`
