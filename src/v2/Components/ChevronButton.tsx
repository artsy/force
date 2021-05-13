import { ChevronIcon, Text } from "@artsy/palette"
import React from "react"

export const ChevronButton: React.FC = ({ children }) => {
  return (
    <Text variant="md" fontWeight="bold" py={1}>
      {children}{" "}
      <ChevronIcon
        // @ts-expect-error STRICT_NULL_CHECK
        title={null}
        direction="right"
        color="black"
        height="15px"
        width="14px"
        top="3px"
        left="3px"
      />
    </Text>
  )
}
