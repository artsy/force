import { Radio, RadioGroup, Spacer } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import type { FC } from "react"

export const ArtworkFilterExpandableSort: FC<
  React.PropsWithChildren<unknown>
> = () => {
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
