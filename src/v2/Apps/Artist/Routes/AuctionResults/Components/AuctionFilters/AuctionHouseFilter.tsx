import { Checkbox, Flex } from "@artsy/palette"
import React from "react"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"
import { FilterExpandable } from "v2/Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "v2/Components/ArtworkFilter/ArtworkFilters/ShowMore"

const auctionHouses = [
  { name: "Sotheby's" },
  { name: "Christie's" },
  { name: "Phillips" },
]

export const AuctionHouseFilter: React.FC = () => {
  const {
    currentlySelectedFilters,
    setFilter,
  } = useAuctionResultsFilterContext()
  const { organizations } = currentlySelectedFilters?.() || {}

  const toggleSelection = (selected: boolean, name: string) => {
    let selectedOrganizations = organizations?.slice() ?? []
    if (selected) {
      selectedOrganizations.push(name)
    } else {
      selectedOrganizations = selectedOrganizations.filter(
        item => item !== name
      )
    }
    setFilter?.("organizations", selectedOrganizations)
  }

  return (
    <FilterExpandable label="Auction House" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          {auctionHouses.map((checkbox, index) => {
            const { name } = checkbox
            const props = {
              key: index,
              onSelect: (selected: boolean) => {
                toggleSelection(selected, name)
              },
              my: 1,
              selected: organizations?.includes(name),
            }
            return <Checkbox {...props}>{name}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
