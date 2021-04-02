import { Checkbox, useThemeConfig } from "@artsy/palette"
import React from "react"
import {
  MultiSelectArtworkFilters,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"

export type Result = {
  name: string
  count: number
  value: string
}

type ResultOptionProps = Omit<Result, "count"> & {
  facetName: keyof MultiSelectArtworkFilters
}

export const ResultOption: React.FC<ResultOptionProps> = ({
  facetName,
  name,
  value,
}) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()
  const results = currentlySelectedFilters()[facetName]

  const handleSelect = (value: string) => (selected: boolean) => {
    setFilter(
      facetName,
      selected
        ? // Append
          [...results, value]
        : // Remove
          results.filter(item => item !== value)
    )
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  return (
    <Checkbox
      onSelect={handleSelect(value)}
      selected={results.includes(value)}
      key={value}
      my={tokens.my}
    >
      {name}
    </Checkbox>
  )
}
