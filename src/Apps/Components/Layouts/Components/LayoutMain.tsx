import { Box, BoxProps } from "@artsy/palette"
import { FC } from "react"

interface LayoutMainProps extends BoxProps {}

export const LayoutMain: FC<LayoutMainProps> = ({ children, ...rest }) => {
  return (
    <Box as="main" id="main" overflowX="hidden" {...rest}>
      {children}
    </Box>
  )
}
