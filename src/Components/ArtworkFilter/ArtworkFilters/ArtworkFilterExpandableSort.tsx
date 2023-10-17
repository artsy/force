import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { Radio, RadioGroup, Spacer } from "@artsy/palette"
import { FC } from "react"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"

export const ArtworkFilterExpandableSort: FC = () => {
  const { sortOptions, filters, setFilter } = useArtworkFilterContext()

  return (
    <FilterExpandable label="Sort" expanded>
      <Spacer y={1} />

      <RadioGroup
        defaultValue={filters?.sort}
        onSelect={option => {
          setFilter("sort", option)
        }}
        gap={2}
      >
        {(sortOptions || []).map(option => {
          return (
            <Radio
              key={option.value}
              value={option.value}
              label={option.text}
            />
          )
        })}
      </RadioGroup>
    </FilterExpandable>
  )
}
