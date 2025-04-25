import { Box, breakpoints } from "@artsy/palette"
import type * as React from "react"

export const Order2App: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Box maxWidth={breakpoints.lg}>{children}</Box>
}
