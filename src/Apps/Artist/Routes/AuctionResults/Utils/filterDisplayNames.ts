import { auctionHouseMap } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/AuctionHouseFilter"
import { categoryMap } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/MediumFilter"
import {
  sizeMap,
  sizeMapInInches,
} from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter"

export const BOOLEAN_FILTER_LABELS = {
  hideUpcoming: "Hide Upcoming",
  includeEstimateRange: "Include Estimate Range",
  includeUnknownPrices: "Include Unknown Prices", // inverted display
  allowEmptyCreatedDates: "Include Unknown Creation Dates", // inverted display
  allowUnspecifiedSaleDates: "Include Unspecified Sale Dates", // inverted display
} as const

// Filters where we show opposite state in pills
export const INVERTED_BOOLEAN_FILTERS = {
  includeUnknownPrices: "Exclude Unknown Prices",
  allowEmptyCreatedDates: "Exclude Unknown Creation Dates",
  allowUnspecifiedSaleDates: "Exclude Unspecified Sale Dates",
} as const

export const getFilterDisplayName = (
  filterType: string,
  value: string,
  context?: { metric?: string }
): string => {
  switch (filterType) {
    case "organizations":
      return (
        auctionHouseMap.find(item => item.name === value)?.displayName || value
      )
    case "categories":
      return categoryMap.find(item => item.name === value)?.displayName || value
    case "sizes":
      const sizeOptions = context?.metric === "in" ? sizeMapInInches : sizeMap
      return sizeOptions.find(item => item.name === value)?.displayName || value
    case "currency":
      return value // Currency displays as-is
    case "keyword":
      return `Keyword: ${value}`
    default:
      return value
  }
}
