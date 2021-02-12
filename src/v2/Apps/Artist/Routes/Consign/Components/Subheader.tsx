import { Box, Color, Text } from "@artsy/palette"
import React from "react"

interface SubheaderProps {
  children: React.ReactNode
  color?: Color
}

export const Subheader: React.FC<SubheaderProps> = ({
  children,
  color = "black100",
}) => {
  return (
    <Box maxWidth="80%" m="auto">
      <Text as="h2" variant="title" color={color}>
        {children}
      </Text>
    </Box>
  )
}
