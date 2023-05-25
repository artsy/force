import { Checkbox, Flex } from "@artsy/palette"
import * as React from "react"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"

export const locationMap = [
  { displayName: "New York", name: "New York" },
  { displayName: "Shanghai", name: "Shanghai" },
  { displayName: "London", name: "London" },
  { displayName: "Paris", name: "Paris" },
  { displayName: "Vienna", name: "Vienna" },
  { displayName: "Amsterdam", name: "Amsterdam" },
]

export const LocationFilter: React.FC = () => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { locations = [] } = useCurrentlySelectedFiltersForAuctionResults()

  const toggleSelection = (selected: boolean, name: string) => {
    let updatedValues = locations

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    setFilter?.("locations", updatedValues)
  }

  return (
    <FilterExpandable label="Sale Location" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          {locationMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: (selected: boolean) => {
                toggleSelection(selected, name)
              },
              my: 1,
              selected: locations?.includes(name),
              testID: `location-filter-${name}`,
            }
            // eslint-disable-next-line react/jsx-key
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
