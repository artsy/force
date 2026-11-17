import type { ArtistStoryTextColor } from "__generated__/ArtistStoryAbout_artist.graphql"

export interface AccentColors {
  bg: string
  color: "mono0" | "mono100"
}

interface AccentColor {
  hex: string
  textColor: ArtistStoryTextColor
}

/**
 * Render the block inside the light theme so `mono0` stays white and `mono100`
 * stays black.
 */
export const getAccentColors = (
  accentColor?: AccentColor | null,
): AccentColors => {
  if (!accentColor) {
    return { bg: "mono10", color: "mono100" }
  }

  return {
    bg: accentColor.hex,
    color: accentColor.textColor === "WHITE" ? "mono0" : "mono100",
  }
}
