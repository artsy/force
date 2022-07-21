import { Text, TextProps } from "@artsy/palette"
import * as React from "react"

interface SubheaderProps extends TextProps {
  children: React.ReactNode
}

export const Subheader: React.FC<SubheaderProps> = ({ children, ...rest }) => {
  return (
    <Text
      as="h2"
      variant={["lg-display", "xl"]}
      maxWidth={["100%", "80%"]}
      m="auto"
      {...rest}
    >
      {children}
    </Text>
  )
}
