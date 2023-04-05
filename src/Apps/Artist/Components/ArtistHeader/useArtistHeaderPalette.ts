import { ButtonVariant } from "@artsy/palette"
import {
  adjustAlpha,
  compareColors,
  getContrastTIQ,
  hexToRgba,
  WHITE,
  stringifyRgba,
  getContrastRatio,
  BLACK,
} from "Utils/color"

const TARGET_CONTRAST_RATIO = 4.5

export const useArtistHeaderPalette = (dominantColor: string) => {
  const backgroundRgba = hexToRgba(dominantColor)
  const foregroundRgba = getContrastTIQ(backgroundRgba)
  const secondaryRgba = adjustAlpha(foregroundRgba, 0.6)

  const buttonVariant: ButtonVariant = compareColors(foregroundRgba, WHITE)
    ? "secondaryWhite"
    : "secondaryBlack"

  const contrastRatio = getContrastRatio(backgroundRgba, secondaryRgba)
  const inverseRgba = compareColors(foregroundRgba, WHITE) ? BLACK : WHITE
  const meetsContrastRatio = contrastRatio >= TARGET_CONTRAST_RATIO
  const overlayRgba = adjustAlpha(inverseRgba, 1 - contrastRatio / 10)

  return {
    backgroundColor: stringifyRgba(backgroundRgba),
    foregroundColor: stringifyRgba(foregroundRgba),
    secondaryColor: stringifyRgba(secondaryRgba),
    overlayColor: meetsContrastRatio
      ? "transparent"
      : stringifyRgba(overlayRgba),
    buttonVariant,
  }
}
