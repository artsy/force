import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCallback } from "react"

export interface Order2DeliveryOptionsCompletedViewProps {
  label: string
  timeEstimatePrefix: string | null
  timeEstimateRange: string | null
}

export const Order2DeliveryOptionsCompletedView: React.FC<
  Order2DeliveryOptionsCompletedViewProps
> = ({ label, timeEstimatePrefix, timeEstimateRange }) => {
  const { editDeliveryOption, checkoutTracking } = useCheckoutContext()

  const onClickEdit = useCallback(() => {
    checkoutTracking.clickedChangePaymentMethod()

    editDeliveryOption()
  }, [checkoutTracking, editDeliveryOption])

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <Text
            color="mono100"
            fontWeight="bold"
            variant={["sm-display", "sm-display", "md"]}
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
          <Text variant="sm" fontWeight="normal" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>
      <Box ml="30px" mt={1}>
        <Text variant="sm-display" color="mono100">
          {label}
        </Text>
        {timeEstimatePrefix && timeEstimateRange && (
          <Text variant="sm" color="mono60">
            {timeEstimatePrefix} <strong>{timeEstimateRange}</strong>
          </Text>
        )}
      </Box>
    </Flex>
  )
}
