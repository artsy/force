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

  if (options.length === 0) {
    return null
  }

  const startOptions = options.filter(
    option =>
      parseInt(option.value) <=
      (saleEndYear || parseInt(options[options.length - 1]?.value))
  )

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
              selected={(saleStartYear || options[0]?.value).toString()}
            />
            <Spacer x={1} />
            <Select
              title="End year"
              options={endOptions}
              onSelect={year => setFilter?.("saleEndYear", parseInt(year))}
              selected={(
                saleEndYear || options[options.length - 1]?.value
              ).toString()}
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
