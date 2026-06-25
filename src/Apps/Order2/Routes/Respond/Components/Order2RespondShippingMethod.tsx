import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { INTERNATIONAL_SHIPPING_WARNING } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { useCompleteDeliveryOptionData } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/useCompleteDeliveryOptionData"
import type { Order2RespondShippingMethod_order$key } from "__generated__/Order2RespondShippingMethod_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondShippingMethodProps {
  order: Order2RespondShippingMethod_order$key
}

/**
 * Read-only (locked) shipping-method summary, matching the collapsed/completed
 * view of the Order2 checkout delivery-options step. Reuses the same data
 * derivation (`useCompleteDeliveryOptionData`); view-only — no Edit affordance.
 */
export const Order2RespondShippingMethod: React.FC<
  Order2RespondShippingMethodProps
> = ({ order }) => {
  const data = useFragment(FRAGMENT, order)
  const shipping = useCompleteDeliveryOptionData(data)

  if (!shipping) {
    return null
  }

  const {
    label,
    price,
    timeEstimatePrefix,
    timeEstimateRange,
    shippingOrigin,
    shippingRadius,
  } = shipping

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Flex alignItems="center">
        <CheckmarkIcon height={20} width={20} fill="mono100" />
        <Spacer x={0.5} />
        <SectionHeading>Shipping method</SectionHeading>
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

const FRAGMENT = graphql`
  fragment Order2RespondShippingMethod_order on Order {
    ...useCompleteDeliveryOptionData_order
  }
`
