import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"
import { Checkbox, Flex, Select, Spacer } from "@artsy/palette"
import type * as React from "react"

export const SaleEndYearFilter: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const { saleEndYear, saleStartYear, allowUnspecifiedSaleDates } =
    useCurrentlySelectedFiltersForAuctionResults()

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
      Number.parseInt(option.value, 10) <=
      (saleEndYear || Number.parseInt(options[options.length - 1]?.value, 10))
  )

  const endOptions = options.filter(
    option =>
      Number.parseInt(option.value, 10) >=
      (saleStartYear || Number.parseInt(options[0]?.value, 10))
  )

  return (
    <FilterExpandable label="Sale Date" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          <Flex>
            <Select
              title="Start year"
              options={startOptions}
              onSelect={year =>
                setFilter?.("saleStartYear", Number.parseInt(year, 10))
              }
              selected={(saleStartYear || options[0]?.value).toString()}
            />
            <Spacer x={1} />
            <Select
              title="End year"
              options={endOptions}
              onSelect={year =>
                setFilter?.("saleEndYear", Number.parseInt(year, 10))
              }
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
