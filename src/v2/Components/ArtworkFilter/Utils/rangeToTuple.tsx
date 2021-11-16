import { ArtworkFilters } from "../ArtworkFilterContext"

export const MIN_PRICE = 50
export const MAX_PRICE = 50000
export const MIN_HEIGHT = 1
export const MAX_HEIGHT = 120
export const MIN_WIDTH = 1
export const MAX_WIDTH = 120

export const rangeToTuple: (
  state: ArtworkFilters,
  range: keyof ArtworkFilters
) => [number, number] = (state, range) => {
  let minStr: string
  let maxStr: string
  let min: number
  let max: number

  if (range === "priceRange") {
    ;[minStr, maxStr] = state.priceRange
      ? state.priceRange.split("-")
      : ["*", "*"]
    min = minStr === "*" ? MIN_PRICE : Number(minStr)
    max = maxStr === "*" ? MAX_PRICE : Number(maxStr)
  } else if (range === "height") {
    ;[minStr, maxStr] = state.height ? state.height.split("-") : ["*", "*"]
    min = minStr === "*" ? MIN_HEIGHT : Number(minStr)
    max = maxStr === "*" ? MAX_HEIGHT : Number(maxStr)
  } else if (range === "width") {
    ;[minStr, maxStr] = state.width ? state.width.split("-") : ["*", "*"]
    min = minStr === "*" ? MIN_WIDTH : Number(minStr)
    max = maxStr === "*" ? MAX_WIDTH : Number(maxStr)
  } else {
    ;[minStr, maxStr] = ["*", "*"]
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  return [min, max]
}
