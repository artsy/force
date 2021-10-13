import React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Steve2_sale } from "v2/__generated__/Steve2_sale.graphql"

export interface Steve2Props {
  sale: Steve2_sale
}

const Steve2: React.FC<Steve2Props> = props => {
  const { sale } = props

  return (
    <>
      <Text variant="xl" as="h1">
        Steve2
      </Text>
      <Text variant="md">{sale?.is_closed}</Text>
    </>
  )
}

export const Steve2FragmentContainer = createFragmentContainer(Steve2, {
  sale: graphql`
    fragment Steve2_sale on Sale {
      is_closed: isClosed
    }
  `,
})
