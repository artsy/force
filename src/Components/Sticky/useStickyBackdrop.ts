import { useTheme } from "@artsy/palette"

export const useStickyBackdrop = () => {
  const { theme } = useTheme()

  const up = {
    backdropFilter: "blur(10px)",
    backgroundColor: {
      light: "rgba(255, 255, 255, 0.9)",
      dark: "rgba(0, 0, 0, 0.9)",
    }[theme.name],
  }

  const down = { backgroundColor: theme.colors.mono0 }

  return { up, down }
}
