import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { INTERNATIONAL_SHIPPING_WARNING } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"

export interface Order2DeliveryOptionsCompletedViewProps {
  label: string
  timeEstimatePrefix: string | null
  timeEstimateRange: string | null
  price?: string | null
  // When provided, an Edit affordance is shown that invokes this callback.
  // Omit it for a locked, view-only rendering.
  onEdit?: () => void
  shippingOrigin?: string | null
  shippingRadius?: string | null
}

export const Order2DeliveryOptionsCompletedView: React.FC<
  Order2DeliveryOptionsCompletedViewProps
> = ({
  label,
  timeEstimatePrefix,
  timeEstimateRange,
  shippingOrigin,
  shippingRadius,
  price,
  onEdit,
}) => {
  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon fill="mono100" />
          <Spacer x={1} />
          <SectionHeading>Shipping method</SectionHeading>
        </Flex>

        {onEdit && (
          <Clickable
            textDecoration="underline"
            cursor="pointer"
            type="button"
            aria-label="Edit shipping method"
            onClick={onEdit}
          >
            <Text variant="sm" fontWeight="normal" color="mono100">
              Edit
            </Text>
          </Clickable>
        )}
      </Flex>

      <Box ml="30px" mt={1}>
        {shippingOrigin && (
          <Text variant="xs">Ships from {shippingOrigin}</Text>
        )}

        {shippingRadius === "international" && (
          <Text variant="xs">{INTERNATIONAL_SHIPPING_WARNING}</Text>
        )}

        <Spacer y={2} />

        <Text variant="sm-display" color="mono100">
          {[label, price].filter(Boolean).join(" ")}
        </Text>

        {timeEstimateRange && (
          <Text variant="sm" color="mono60">
            {timeEstimatePrefix} <strong>{timeEstimateRange}</strong>
          </Text>
        )}
      </Box>
    </Flex>
  )
}
