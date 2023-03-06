import { Checkbox, Flex } from "@artsy/palette"
import * as React from "react"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"

export const auctionHouseMap = [
  { displayName: "Sotheby's", name: "Sotheby's" },
  { displayName: "Christie's", name: "Christie's" },
  { displayName: "Phillips", name: "Phillips" },
  { displayName: "Bonhams", name: "Bonhams" },
  { displayName: "Artsy Auction", name: "Artsy Auction" },
]

export const AuctionHouseFilter: React.FC = () => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { organizations = [] } = useCurrentlySelectedFiltersForAuctionResults()

  const toggleSelection = (selected: boolean, name: string) => {
    let updatedValues = organizations

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    setFilter?.("organizations", updatedValues)
  }

  return (
    <FilterExpandable label="Auction House" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          {auctionHouseMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: (selected: boolean) => {
                toggleSelection(selected, name)
              },
              my: 1,
              selected: organizations?.includes(name),
              testID: `organization-filter-${name}`,
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
