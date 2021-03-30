import { Flex, Toggle } from "@artsy/palette"
import { intersection, sortBy } from "lodash"
import React from "react"
import {
  MultiSelectArtworkFilters,
  Slice,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"
import { FacetFilter, useFacetFilter } from "./FacetFilter"
import { Result, ResultOption } from "./ResultOption"

export const sortResults = (
  selectedValues: Array<string>,
  allResults: Array<Result>
) => {
  const selectedFacets = allResults.filter(({ value }) => {
    return selectedValues.includes(value)
  })

  return selectedFacets.concat(
    allResults.filter(({ value }) => {
      return !selectedValues.includes(value)
    })
  )
}

interface ResultsFilterProps {
  facetName: keyof MultiSelectArtworkFilters
  slice: Slice
  label: string
  placeholder: string
  expanded?: boolean
}

export const ResultsFilter: React.FC<ResultsFilterProps> = ({
  facetName,
  slice,
  label,
  placeholder,
  expanded = true,
}) => {
  const { aggregations, currentlySelectedFilters } = useArtworkFilterContext()
  const { isFiltered, handleFilterChange } = useFacetFilter()

  const selectedValues = currentlySelectedFilters()[facetName]
  const results = aggregations.find(aggregation => aggregation.slice === slice)
    ?.counts

  if (!results?.length) {
    return null
  }

  const resultsSorted = sortResults(
    selectedValues,
    sortBy(results, ["count"]).reverse()
  )

  const isBelowTheFoldFilterSelected =
    intersection(
      selectedValues,
      resultsSorted.slice(INITIAL_ITEMS_TO_SHOW).map(({ value }) => value)
    ).length > 0

  return (
    <Toggle label={label} expanded={expanded}>
      <Flex flexDirection="column">
        <FacetFilter
          facetName={facetName}
          placeholder={placeholder}
          results={results}
          onChange={handleFilterChange}
        />

        {!isFiltered && (
          <ShowMore expanded={isBelowTheFoldFilterSelected}>
            {resultsSorted.map(({ name, value }) => {
              return (
                <ResultOption
                  key={value}
                  facetName={facetName}
                  name={name}
                  value={value}
                />
              )
            })}
          </ShowMore>
        )}
      </Flex>
    </Toggle>
  )
}
