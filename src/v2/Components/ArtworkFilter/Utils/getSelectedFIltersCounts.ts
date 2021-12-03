import { isArray } from "lodash"
import {
  ArtworkFilters,
  FilterParamName,
  initialArtworkFilterState,
  SelectedFiltersCounts,
} from "../ArtworkFilterContext"

const waysToBuyFilterNames = [
  FilterParamName.waysToBuyBuy,
  FilterParamName.waysToBuyMakeOffer,
  FilterParamName.waysToBuyBid,
  FilterParamName.waysToBuyInquire,
]

const rangeFilterNames = [
  FilterParamName.width,
  FilterParamName.height,
  FilterParamName.priceRange,
]

export const getSelectedFiltersCounts = (
  selectedFilters: ArtworkFilters = {}
) => {
  const counts: Partial<SelectedFiltersCounts> = {}
  const filtersParams = Object.values(FilterParamName)

  Object.entries(selectedFilters).forEach(([paramName, paramValue]) => {
    if (!filtersParams.includes(paramName as any)) {
      return
    }

    switch (true) {
      case waysToBuyFilterNames.includes(paramName as FilterParamName): {
        if (paramValue) {
          counts.waysToBuy = (counts.waysToBuy ?? 0) + 1
        }
        break
      }
      case rangeFilterNames.includes(paramName as FilterParamName): {
        if (paramValue !== "*-*") {
          counts[paramName] = 1
        }
        break
      }
      case paramName === FilterParamName.artistsIFollow: {
        if (paramValue) {
          counts.artistIDs = (counts.artistIDs ?? 0) + 1
        }
        break
      }
      case paramName === FilterParamName.sort: {
        if (paramValue !== initialArtworkFilterState.sort) {
          counts[paramName] = 1
        }
        break
      }
      case paramName === FilterParamName.artistIDs: {
        if (paramValue.length > 0) {
          counts.artistIDs = paramValue.length + (counts.artistIDs ?? 0)
        }
        break
      }
      case isArray(paramValue): {
        if (paramValue.length > 0) {
          counts[paramName] = paramValue.length
        }
        break
      }

      default: {
        counts[paramName] = 1
      }
    }
  })

  return counts
}
