import { Text } from "@artsy/palette"
import React, { FC } from "react"

export const OptionText: FC = ({ children }) => {
  return (
    <Text variant="text" pt="3px">
      {children}
    </Text>
  )
}
