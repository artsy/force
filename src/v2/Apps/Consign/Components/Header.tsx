import React from "react"
import { Box, Button, Text } from "@artsy/palette"

export const Header: React.FC = () => {
  return (
    <Box>
      <Text variant="largeTitle" as="h1">
        Sell with Artsy
      </Text>
      <Button size="large">Get a free Valuation</Button>
    </Box>
  )
}
