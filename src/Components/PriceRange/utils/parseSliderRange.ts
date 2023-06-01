import { CustomRange, DEFAULT_RANGE } from "Components/PriceRange/constants"

export const parseSliderRange = (range: CustomRange) => {
  return range.map((value, index) => {
    if (value === "*") {
      return DEFAULT_RANGE[index]
    }

    return value as number
  })
}
