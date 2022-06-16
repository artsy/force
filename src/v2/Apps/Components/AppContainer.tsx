import { Box, BoxProps, useTheme, useThemeConfig } from "@artsy/palette"
import { ThemeV2, ThemeV3 } from "@artsy/palette/dist/themes"
import * as React from "react";

interface AppContainerProps extends BoxProps {}

/**
 * Handles the max-width of the application. That's it!
 */
export const AppContainer: React.FC<AppContainerProps> = ({
  children,
  maxWidth: defaultMaxWidth,
  ...rest
}) => {
  const { theme: { breakpoints = { lg: null, xl: null } } = {} } = useTheme<
    ThemeV2 & ThemeV3
  >()

  const maxWidth = useThemeConfig({ v2: breakpoints.xl, v3: breakpoints.lg })
  const appShellMaxWidth = defaultMaxWidth ?? maxWidth

  return (
    <Box width="100%" mx="auto" maxWidth={appShellMaxWidth} {...rest}>
      {children}
    </Box>
  )
}
