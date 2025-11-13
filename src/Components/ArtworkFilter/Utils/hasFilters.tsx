import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { isDefaultFilter } from "./isDefaultFilter"

export const hasFilters: (state: ArtworkFilters) => boolean = state => {
  return Object.entries(state).some(
    ([key, value]: [keyof ArtworkFilters, any]) => {
      return !isDefaultFilter(key, value)
    }
  )
}
