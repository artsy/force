import { Box, Text } from "@artsy/palette"
import React from "react"

export const GeneFamily = props => {
  const { geneFamily } = props

  return (
    <Box>
      <Text variant="xl">{geneFamily.name}</Text>
    </Box>
  )
}
