import { useTheme } from "@artsy/palette"

export const useStickyBackdrop = () => {
  const { theme } = useTheme()

  const up = {
    backgroundColor: {
      light: "rgba(255, 255, 255, 0.98)",
      dark: "rgba(0, 0, 0, 0.9)",
    }[theme.name],
  }

  const down = { backgroundColor: theme.colors.mono0 }

  return { up, down }
}
