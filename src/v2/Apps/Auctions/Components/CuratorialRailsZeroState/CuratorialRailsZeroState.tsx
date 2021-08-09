import { Box, Text } from "@artsy/palette"
import React from "react"

export interface CuratorialRailsZeroStateProps {}

export const CuratorialRailsZeroState: React.FC<CuratorialRailsZeroStateProps> = props => {
  return (
    <Box>
      <Text
        as="h3"
        color="black60"
        mb={12}
        mt={6}
        textAlign="center"
        variant="mediumText"
      >
        No Works To Show
      </Text>
    </Box>
  )
}
