import { Text, VisuallyHidden } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useState } from "react";
import * as React from "react";
import styled from "styled-components"
import {
  FilterInput,
  FilterInputProps,
} from "v2/Components/FilterInput/FilterInput"
import { MultiSelectArtworkFilters } from "../ArtworkFilterContext"
import { Result, ResultOption } from "./ResultOption"

const FacetFilterInput = styled(FilterInput)`
  /* HACK: Setting the font-size to a minimum 16px prevents iOS from zooming on focus */
  /* This won't be necessary when upgraded to Palette v3 */
  @media ${themeGet("mediaQueries.xs")} {
    input {
      font-size: 16px;
    }
  }
`

interface FacetFilterProps extends Omit<FilterInputProps, "results"> {
  facetName: keyof MultiSelectArtworkFilters
  results: Result[]
}

export const FacetFilter: React.FC<FacetFilterProps> = ({
  facetName,
  results,
  onChange,
  ...rest
}) => {
  const [query, setQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<Result[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    setQuery(value)

    onChange && onChange(event)

    if (value === "") {
      setFilteredResults([])
      return
    }

    setFilteredResults(() =>
      results.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  return (
    <>
      <FacetFilterInput onChange={handleChange} mb={1} {...rest} />

      {query !== "" && (
        <VisuallyHidden aria-live="polite">
          {`${filteredResults.length} result${
            filteredResults.length === 1 ? "" : "s"
          }`}
        </VisuallyHidden>
      )}

      {filteredResults.length === 0 && query !== "" && (
        <Text variant="caption">No results.</Text>
      )}

      {filteredResults.map(result => (
        <ResultOption key={result.value} facetName={facetName} {...result} />
      ))}
    </>
  )
}

export const useFacetFilter = () => {
  const [isFiltered, setIsFiltered] = useState(false)

  const handleFilterChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setIsFiltered(value !== "")

  return { isFiltered, handleFilterChange }
}
