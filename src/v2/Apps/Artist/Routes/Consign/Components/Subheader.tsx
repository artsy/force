import { Box, Color, Serif } from "@artsy/palette"
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
      <Serif element="h2" size="10" color={color}>
        {children}
      </Serif>
    </Box>
  )
}
