import { Box, BoxProps, useTheme } from "@artsy/palette"
import { ThemeV3 } from "@artsy/palette/dist/themes"
import * as React from "react"

interface AppContainerProps extends BoxProps {}

/**
 * Handles the max-width of the application. That's it!
 */
export const AppContainer: React.FC<AppContainerProps> = ({
  children,
  maxWidth: defaultMaxWidth,
  ...rest
}) => {
  const {
    theme: { breakpoints },
  } = useTheme<ThemeV3>()

  const maxWidth = breakpoints.lg
  const appShellMaxWidth = defaultMaxWidth ?? maxWidth

  return (
    <Box width="100%" mx="auto" maxWidth={appShellMaxWidth} {...rest}>
      {children}
    </Box>
  )
}
