import { Box, Text } from "@artsy/palette"
import type { OrderDetailsHeader_order$key } from "__generated__/OrderDetailsHeader_order.graphql"
import { graphql, useFragment } from "react-relay"

interface OrderDetailsHeaderProps {
  order: OrderDetailsHeader_order$key
}

export const OrderDetailsHeader = ({ order }: OrderDetailsHeaderProps) => {
  const orderData = useFragment(FRAGMENT, order)

  return (
    <Box backgroundColor="mono0" px={[2, 4]} py={2}>
      {/* Title */}
      <Text variant={["lg", "xl"]}>{orderData.displayTexts.title}</Text>
      {/* Order # */}
      {/* data-test attribute below used for integrity now. */}
      <Text variant={["xs", "sm"]} data-test="OrderCode">
        Order #{orderData.code}
      </Text>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment OrderDetailsHeader_order on Order {
    code
    displayTexts {
      title
    }
  }
`
