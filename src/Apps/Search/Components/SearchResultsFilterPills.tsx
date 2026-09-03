import { Flex, Text } from "@artsy/palette"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import {
  TIME_PERIOD_OPTIONS,
  getTimePeriodToDisplay,
} from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { FilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { PriceRangeFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/PriceRangeFilterQuick"
import type { FC } from "react"

/** Keep in sync with the pills below, so "All Filters" doesn't double-count */
export const SEARCH_RESULTS_FILTER_PILL_FIELDS = [
  "additionalGeneIDs",
  "attributionClass",
  "priceRange",
  "majorPeriods",
]

export const SearchResultsFilterPills: FC = () => {
  return (
    <Flex alignItems="center" gap={1}>
      <Text variant="xs" color="mono60" flexShrink={0}>
        Filter:
      </Text>

      <FilterQuick
        label="Rarity"
        name="attributionClass"
        options={ATTRIBUTION_CLASS_OPTIONS}
        labelAppliedValues
      />

      <FilterQuick
        label="Medium"
        name="additionalGeneIDs"
        slice="MEDIUM"
        options={MEDIUM_OPTIONS}
        labelAppliedValues
      />

      <PriceRangeFilterQuick labelAppliedValues />

      <FilterQuick
        label="Years"
        name="majorPeriods"
        slice="MAJOR_PERIOD"
        options={TIME_PERIOD_OPTIONS}
        formatOptionName={getTimePeriodToDisplay}
        labelAppliedValues
      />
    </Flex>
  )
}
