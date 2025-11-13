import {
  type CustomRange,
  DEFAULT_CUSTOM_RANGE,
  DEFAULT_PRICE_RANGE,
  PRICE_RANGE_FORMAT,
} from "Components/PriceRange/constants"

const parsePart = (part: string): number | "*" => {
  if (part === "*") return part
  const parsed = Number.parseFloat(part)
  return isNaN(parsed) ? "*" : Math.floor(parsed)
}

const handleInvalidFormat = (range: string): CustomRange => {
  const parts = range.split("-")

  if (parts.length === 2) {
    const lower = parts[0] ? parsePart(parts[0]) : "*"
    const upper = parts[1] ? parsePart(parts[1]) : "*"

    return [lower, upper]
  }

  return DEFAULT_CUSTOM_RANGE
}

export const parsePriceRange = (
  range: string = DEFAULT_PRICE_RANGE
): CustomRange => {
  const match = range.match(PRICE_RANGE_FORMAT)

  if (match) {
    const lower = parsePart(match[1])
    const upper = parsePart(match[3])

    return [lower, upper]
  }

  return handleInvalidFormat(range)
}
