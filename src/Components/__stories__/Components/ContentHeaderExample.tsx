import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import * as React from "react"

export const ContentHeaderExample: React.FC<BoxProps> = props => {
  return (
    <Box {...props}>
      <Flex justifyContent="space-between">
        <Text variant="lg-display">Headline Text</Text>

        <Text variant="sm">
          <a href="#example">Text Link</a>
        </Text>
      </Flex>

      <Text variant="lg-display" color="black60">
        Supporting Copy Line
      </Text>
    </Box>
  )
}
