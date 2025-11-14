import { Box, type BoxProps, Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"

export const ContentHeaderExample: React.FC<
  React.PropsWithChildren<BoxProps>
> = props => {
  return (
    <Box {...props}>
      <Flex justifyContent="space-between">
        <Text variant="lg-display">Headline Text</Text>

        <Text variant="sm">
          <RouterLink to="#example">Text Link</RouterLink>
        </Text>
      </Flex>

      <Text variant="lg-display" color="mono60">
        Supporting Copy Line
      </Text>
    </Box>
  )
}
