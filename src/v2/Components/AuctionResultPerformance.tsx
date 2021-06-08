import React from "react"
import {
  Text,
  ThemeProviderV3,
  IncreaseIcon,
  Flex,
  DecreaseIcon,
} from "@artsy/palette"

export const AuctionResultPerformance = ({
  value,
}: {
  value: string | null
}) => {
  if (value === null) {
    return null
  }

  const sign = value[0] === "-" ? "down" : "up"
  const color = sign === "up" ? "green100" : "red100"
  const text = sign === "up" ? value : value.slice(1)
  const Arrow = sign === "up" ? IncreaseIcon : DecreaseIcon

  return (
    <ThemeProviderV3>
      <Flex
        flex={0}
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="baseline"
      >
        <Arrow fill={color} height={10} mr="0.3" />
        <Text variant="xs" fontWeight={400} color={color}>
          {text} est
        </Text>
      </Flex>
    </ThemeProviderV3>
  )
}
