import { CustomRange } from "Components/PriceRange/constants"

export const getValue = (value: CustomRange[number]) => {
  return value === "*" || value === 0 ? "" : value
}
