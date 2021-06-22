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
  const filterContext = useAuctionResultsFilterContext()

  const toggleSelection = (selected, name) => {
    // @ts-expect-error STRICT_NULL_CHECK
    let organizations = filterContext.filters.organizations.slice()
    if (selected) {
      organizations.push(name)
    } else {
      organizations = organizations.filter(item => item !== name)
    }
    filterContext.setFilter("organizations", organizations)
  }

  return (
    <FilterExpandable label="Auction house" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          {auctionHouses.map((checkbox, index) => {
            const { name } = checkbox
            const props = {
              key: index,
              onSelect: selected => {
                toggleSelection(selected, name)
              },
              my: 1,
              // @ts-expect-error STRICT_NULL_CHECK
              selected: filterContext.filters.organizations.includes(name),
            }
            return <Checkbox {...props}>{name}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
