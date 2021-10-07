import React from "react"
import { Text } from "@artsy/palette"

export const AuctionsZeroState: React.FC = ({ children }) => {
  return (
    <Text
      as="h3"
      color="black60"
      mb={12}
      mt={6}
      textAlign="center"
      variant="md"
    >
      {children}
    </Text>
  )
}
