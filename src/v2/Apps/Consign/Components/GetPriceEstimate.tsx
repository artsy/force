import React from "react"
import { Box, Flex, Text } from "@artsy/palette"

export const GetPriceEstimate: React.FC = () => {
  return (
    <Flex
      flexDirection={["column", "row"]}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Text variant="title">Get a Price Estimate</Text>
        <Text variant="text">
          Discover the potential of reselling an artwork you own.
        </Text>
      </Box>
      <Box>
        <Box>Artwork</Box>
        <Box>Artwork</Box>
        <Box>Artwork</Box>
      </Box>
    </Flex>
  )
}
