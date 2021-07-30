import { Box, Text } from "@artsy/palette"
import React from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

interface PastEventRailCellProps {
  item: any
}

export const PastEventRailCell: React.FC<PastEventRailCellProps> = props => {
  const { item } = props

  return (
    <RouterLink to={`/fair/${item.slug}`} textDecoration="none">
      <Box width={325} height={240} bg="black10" />
      <Text variant="xl" mt={1}>
        {item.label}
      </Text>
    </RouterLink>
  )
}
