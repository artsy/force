import { Box, breakpoints } from "@artsy/palette"
import React from "react"

interface AppContainerProps {
  children: React.ReactNode
  maxWidth?: number | string
}

export const AppContainer: React.FC<AppContainerProps> = ({
  children,
  maxWidth = breakpoints.xl,
}) => {
  return (
    <Box width="100%" maxWidth={maxWidth} m="auto">
      {children}
    </Box>
  )
}
