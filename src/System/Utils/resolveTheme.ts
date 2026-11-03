import type { PaletteThemeName } from "@artsy/palette"

interface ResolveThemeParams {
  themeOverride?: string | null
  preferredTheme?: string | null
}

export const resolveTheme = ({
  themeOverride,
  preferredTheme,
}: ResolveThemeParams): PaletteThemeName => {
  const theme = themeOverride ?? preferredTheme

  if (theme !== "dark" && theme !== "light") {
    return "light"
  }

  return theme
}
