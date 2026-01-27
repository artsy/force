import { useTheme } from "@artsy/palette"
import { THEME, THEME_DARK } from "@artsy/palette-tokens"

export const useStickyBackdrop = () => {
  const { theme } = useTheme()

  const up = {
    backgroundColor: {
      light: `${THEME.colors.mono0}FA`, // @ 98% opacity
      dark: `${THEME_DARK.colors.mono0}FA`, // @ 98% opacity
    }[theme.name],
  }

  const down = { backgroundColor: theme.colors.mono0 }

  return { up, down }
}
