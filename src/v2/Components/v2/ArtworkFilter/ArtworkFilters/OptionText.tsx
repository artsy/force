import { Text, TextProps } from "@artsy/palette"
import React, { FC } from "react"

export const OptionText: FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text variant="text" pt="3px" {...rest}>
      {children}
    </Text>
  )
}
