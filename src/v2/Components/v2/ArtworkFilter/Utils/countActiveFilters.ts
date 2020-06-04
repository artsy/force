import { ArtworkFilters } from "../ArtworkFilterContext"

export const countActiveFilters = (filters: ArtworkFilters) => {
  let count = 0

  // Medium
  if (filters.medium) count += 1

  // Price
  if (filters.priceRange) count += 1

  // Ways to buy
  if (filters.offerable) count += 1
  if (filters.acquireable) count += 1
  if (filters.atAuction) count += 1
  if (filters.inquireableOnly) count += 1

  // Size
  if (filters.sizes?.length) count += filters.sizes.length

  // Time period
  if (filters.majorPeriods?.length) count += 1

  // Color
  if (filters.color) count += 1

  return count
}
