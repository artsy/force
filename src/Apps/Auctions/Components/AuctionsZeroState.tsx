import { Text } from "@artsy/palette"
import type * as React from "react"

export const AuctionsZeroState: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <Text
      as="h3"
      color="mono60"
      mb={12}
      mt={6}
      textAlign="center"
      variant="sm-display"
    >
      {children}
    </Text>
  )
}
