import { Text } from "@artsy/palette"
import type { Order2DetailsHeader_order$key } from "__generated__/Order2DetailsHeader_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2DetailsHeaderProps {
  order: Order2DetailsHeader_order$key
}

export const Order2DetailsHeader = ({ order }: Order2DetailsHeaderProps) => {
  const orderData = useFragment(FRAGMENT, order)

  return (
    <>
      {/* Title */}
      <Text variant="lg">{orderData.displayTexts.title}</Text>
      {/* Order # */}
      <Text variant="xs">Order #{orderData.code} </Text>
    </>
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
