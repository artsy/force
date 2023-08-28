import * as React from "react"
import { Checkbox, Flex, Select, Spacer } from "@artsy/palette"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"

export const SaleEndYearFilter: React.FC = () => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const {
    saleEndYear,
    saleStartYear,
    allowUnspecifiedSaleDates,
  } = useCurrentlySelectedFiltersForAuctionResults()

  const options = (
    aggregations
      ?.find(aggregation => aggregation.slice === "LOTS_BY_SALE_YEAR")
      ?.counts.filter(c => c !== null) || []
  ).map(c => ({
    text: c?.name,
    value: c?.name,
  }))

  // All options less than the end year
  const startOptions = options.filter(
    option =>
      parseInt(option.value) <=
      (saleEndYear || parseInt(options[options.length - 1]?.value))
  )

  // All options greater than the start year
  const endOptions = options.filter(
    option =>
      parseInt(option.value) >= (saleStartYear || parseInt(options[0]?.value))
  )
  return (
    <FilterExpandable label="Sale Date" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          <Flex>
            <Select
              title="Start year"
              options={startOptions}
              onSelect={year => setFilter?.("saleStartYear", parseInt(year))}
              defaultValue={options[0]?.value}
            />
            <Spacer x={1} />
            <Select
              title="End year"
              options={endOptions}
              onSelect={year => setFilter?.("saleEndYear", parseInt(year))}
              defaultValue={new Date().getFullYear().toString()}
            />
          </Flex>

          <Spacer y={2} />

          <Checkbox
            selected={allowUnspecifiedSaleDates}
            onSelect={unspecified =>
              setFilter?.("allowUnspecifiedSaleDates", unspecified)
            }
          >
            Include unspecified sale dates
          </Checkbox>
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
