import { Box, BoxProps, useTheme } from "@artsy/palette"
import { Theme } from "@artsy/palette"
import { FC, ElementType, HTMLAttributes } from "react"

interface AppContainerProps extends BoxProps, HTMLAttributes<HTMLElement> {
  as?: ElementType | keyof JSX.IntrinsicElements
}

/**
 * Handles the max-width of the application. That's it!
 */
export const AppContainer: FC<AppContainerProps> = ({
  children,
  maxWidth,
  ...rest
}) => {
  const { theme: { breakpoints = { lg: null } } = {} } = useTheme<Theme>()

  const appShellMaxWidth = maxWidth ?? breakpoints.lg

  return (
    <Box width="100%" mx="auto" maxWidth={appShellMaxWidth} {...rest}>
      {children}
    </Box>
  )
}
