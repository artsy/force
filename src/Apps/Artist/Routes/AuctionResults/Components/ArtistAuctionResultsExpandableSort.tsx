import { Radio, RadioGroup, Spacer } from "@artsy/palette"
import { useAuctionResultsFilterContext } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import type { FC } from "react"
import { SORTS } from "./ArtistAuctionResultsSortSelect"

export const ArtistAuctionResultsExpandableSort: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { filters, setFilter } = useAuctionResultsFilterContext()

  return (
    <FilterExpandable label="Sort" expanded>
      <Spacer y={1} />

      <RadioGroup
        defaultValue={filters.sort}
        onSelect={option => {
          setFilter("sort", option)
        }}
        gap={2}
      >
        {SORTS.map(option => {
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
