import { parsePriceRange } from "Components/PriceRange/Utils/parsePriceRange"

export const priceRangeToLabel = (range: string) => {
  const [min, max] = parsePriceRange(range)

  if (min === "*" && max === "*") {
    return "$0+"
  }

  if (min === "*") {
    return `$0–$${max}`
  }

  if (max === "*") {
    return `$${min}+`
  }
  return `$${min}–$${max}`
}
