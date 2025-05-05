import { Text } from "@artsy/palette"
import type { DetailsHeader_order$key } from "__generated__/DetailsHeader_order.graphql"
import { graphql, useFragment } from "react-relay"

interface DetailsHeaderProps {
  order: DetailsHeader_order$key
}

export const DetailsHeader = ({ order }: DetailsHeaderProps) => {
  const orderData = useFragment(FRAGMENT, order)

  return (
    <>
      {/* Title */}
      <Text variant="lg">{orderData.displayTexts.titleText}</Text>
      {/* Order # */}
      <Text variant="xs">Order #{orderData.code} </Text>
    </>
  )
}

const FRAGMENT = graphql`
  fragment DetailsHeader_order on Order {
    code
    displayTexts {
      titleText
    }
  }
`
