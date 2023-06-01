import { DEFAULT_RANGE } from "Components/PriceRange/constants"

export const convertToFilterFormatRange = (range: number[]) => {
  return range.map((value, index) => {
    if (value === DEFAULT_RANGE[index]) {
      return "*"
    }

    return value
  })
}
