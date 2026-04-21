import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCallback } from "react"

export interface Order2DeliveryOptionsCompletedViewProps {
  label: string
  timeEstimatePrefix: string | null
  timeEstimateRange: string | null
  price?: string | null
  simplePriceDisplay?: string | null
  allowEdit?: boolean
}

export const Order2DeliveryOptionsCompletedView: React.FC<
  Order2DeliveryOptionsCompletedViewProps
> = ({
  label,
  timeEstimatePrefix,
  timeEstimateRange,
  price,
  simplePriceDisplay,
  allowEdit = true,
}) => {
  const { editStep, checkoutTracking } = useCheckoutContext()

  const onClickEdit = useCallback(() => {
    checkoutTracking.clickedChangeDeliveryOptions()

    editStep(CheckoutStepName.DELIVERY_OPTION)
  }, [checkoutTracking, editStep])

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <SectionHeading>Shipping method</SectionHeading>
        </Flex>
        {allowEdit && (
          <Clickable
            textDecoration="underline"
            cursor="pointer"
            type="button"
            aria-label="Edit shipping method"
            onClick={onClickEdit}
          >
            <Text variant="sm" fontWeight="normal" color="mono100">
              Edit
            </Text>
          </Clickable>
        )}
      </Flex>
      <Box ml="30px" mt={1}>
        <Flex>
          <Text variant="sm-display" color="mono100">
            {[label, simplePriceDisplay].filter(Boolean).join(" ")}
          </Text>
          <Spacer x={2} />
        </Flex>
        {timeEstimatePrefix && timeEstimateRange && (
          <Text variant="sm" color="mono60">
            {timeEstimatePrefix} <strong>{timeEstimateRange}</strong>
          </Text>
        )}
      </Box>
    </Flex>
  )
}
