import { Box, BoxProps, useTheme, useThemeConfig } from "@artsy/palette"
import { ThemeV2, ThemeV3 } from "@artsy/palette/dist/themes"
import React from "react"

interface AppContainerProps extends BoxProps {}

export const AppContainer: React.FC<AppContainerProps> = ({
  children,
  maxWidth: defaultMaxWidth,
  ...rest
}) => {
  const { theme: { breakpoints = { lg: null, xl: null } } = {} } = useTheme<
    ThemeV2 & ThemeV3
  >()

  const maxWidth = useThemeConfig({ v2: breakpoints.xl, v3: breakpoints.lg })

  return (
    <Box width="100%" m="auto" maxWidth={defaultMaxWidth ?? maxWidth} {...rest}>
      {children}
    </Box>
  )
}
