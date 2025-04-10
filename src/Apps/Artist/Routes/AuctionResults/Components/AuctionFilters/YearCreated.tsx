import { Checkbox, Flex, Select, Spacer } from "@artsy/palette"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"
import type * as React from "react"

export const YearCreated: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const { createdAfterYear, createdBeforeYear, allowEmptyCreatedDates } =
    useCurrentlySelectedFiltersForAuctionResults()

  const options = (
    aggregations
      ?.find(aggregation => aggregation.slice === "LOTS_BY_CREATED_YEAR")
      ?.counts.filter(c => c !== null) || []
  ).map(c => ({
    text: c?.name,
    value: c?.name,
  }))

  if (options.length === 0 || (!createdAfterYear && !createdBeforeYear)) {
    return null
  }

  const startOptions = options.filter(
    option =>
      Number.parseInt(option.value) <=
      (createdBeforeYear ||
        Number.parseInt(options[options.length - 1]?.value)),
  )

  const endOptions = options.filter(
    option =>
      Number.parseInt(option.value) >=
      (createdAfterYear || Number.parseInt(options[0]?.value)),
  )

  return (
    <FilterExpandable label="Year Created" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          <Flex>
            <Select
              title="Earliest"
              options={startOptions}
              onSelect={year =>
                setFilter?.("createdAfterYear", Number.parseInt(year))
              }
              selected={(createdAfterYear || startOptions[0]?.value).toString()}
            />
            <Spacer x={1} />

            <Select
              title="Latest"
              options={endOptions}
              onSelect={year => {
                setFilter?.("createdBeforeYear", Number.parseInt(year))
              }}
              selected={(
                createdBeforeYear || endOptions[endOptions.length - 1]?.value
              ).toString()}
            />
          </Flex>

          <Spacer y={2} />

          <Checkbox
            selected={allowEmptyCreatedDates}
            onSelect={allowEmpty => {
              setFilter?.("allowEmptyCreatedDates", allowEmpty)
            }}
          >
            Include unspecified dates
          </Checkbox>
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
