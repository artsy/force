import React from "react"
import { Box, BoxProps, ResponsiveBox, Text } from "@artsy/palette"

interface ShowViewingRoom extends BoxProps {}

export const ShowViewingRoom = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Text variant="mediumText" mb={1}>
        Viewing Room
      </Text>

      <ResponsiveBox
        bg="black10"
        borderRadius={4}
        maxWidth="100%"
        aspectWidth={3}
        aspectHeight={4}
      />
    </Box>
  )
}
