import { DEFAULT_PRICE_RANGE } from "Components/PriceRange/constants"

export const parsePriceRange = (range: string = DEFAULT_PRICE_RANGE) => {
  return range.split("-").map(s => {
    if (s === "*") return s
    return parseInt(s, 10)
  })
}
