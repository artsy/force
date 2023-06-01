import { CustomRange } from "Components/PriceRange/constants"

export const getPriceValue = (value: CustomRange[number]) => {
  return value === "*" || value === 0 ? "" : value
}
