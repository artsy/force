import { Box, Text } from "@artsy/palette"
import type { Order2DetailsHeader_order$key } from "__generated__/Order2DetailsHeader_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2DetailsHeaderProps {
  order: Order2DetailsHeader_order$key
}

export const Order2DetailsHeader = ({ order }: Order2DetailsHeaderProps) => {
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
  fragment Order2DetailsHeader_order on Order {
    code
    displayTexts {
      title
    }
  }
`
