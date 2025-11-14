import type { Aggregations } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"
import { Checkbox, Flex, Select, Spacer } from "@artsy/palette"
import type * as React from "react"

interface YearCreatedProps {
  isExpandable?: boolean
}

export const YearCreated: React.FC<
  React.PropsWithChildren<YearCreatedProps>
> = ({ isExpandable = true }) => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const { createdAfterYear, createdBeforeYear, allowEmptyCreatedDates } =
    useCurrentlySelectedFiltersForAuctionResults()

  const { minYear, maxYear } = getCreatedYearBounds(aggregations)

  const options = (
    aggregations
      ?.find(aggregation => aggregation.slice === "LOTS_BY_CREATED_YEAR")
      ?.counts?.filter(c => c !== null) || []
  ).map(c => ({
    text: c?.name,
    value: c?.name,
  }))

  if (options.length === 0 || (!createdAfterYear && !createdBeforeYear)) {
    return null
  }

  const upperBound = createdBeforeYear ?? maxYear
  const startOptions = options.filter(option => {
    const v = Number.parseInt(option.value, 10)
    return upperBound == null ? true : v <= upperBound
  })

  const lowerBound = createdAfterYear ?? minYear
  const endOptions = options.filter(option => {
    const v = Number.parseInt(option.value, 10)
    return lowerBound == null ? true : v >= lowerBound
  })

  const selectedStart = String(createdAfterYear ?? minYear ?? "")
  const selectedEnd = String(createdBeforeYear ?? maxYear ?? "")

  return (
    <FilterExpandable label="Year Created" expanded enabled={isExpandable}>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          <Flex>
            <Select
              title="Earliest"
              options={startOptions}
              onSelect={year =>
                setFilter("createdAfterYear", Number.parseInt(year, 10))
              }
              selected={selectedStart}
            />
            <Spacer x={1} />

            <Select
              title="Latest"
              options={endOptions}
              onSelect={year => {
                setFilter("createdBeforeYear", Number.parseInt(year, 10))
              }}
              selected={selectedEnd}
            />
          </Flex>

          <Spacer y={2} />

          <Checkbox
            selected={allowEmptyCreatedDates}
            onSelect={allowEmpty => {
              setFilter("allowEmptyCreatedDates", allowEmpty)
            }}
          >
            Include unspecified dates
          </Checkbox>
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}

export const getCreatedYearBounds = (
  aggregations?: Aggregations,
): { minYear: number | null; maxYear: number | null } => {
  const aggregation = aggregations?.find(
    a => a.slice === "LOTS_BY_CREATED_YEAR",
  )

  const numericYears =
    aggregation?.counts
      ?.map(c => Number.parseInt(c.name, 10))
      .filter(y => Number.isFinite(y)) ?? []

  if (numericYears.length === 0) {
    return { minYear: null, maxYear: null }
  }

  return {
    minYear: Math.min(...numericYears),
    maxYear: Math.max(...numericYears),
  }
}
