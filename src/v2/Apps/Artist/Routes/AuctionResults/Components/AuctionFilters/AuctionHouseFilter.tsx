import { Box, Checkbox, Flex, Toggle } from "@artsy/palette"
import React from "react"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"

const auctionHouses = [
  { name: "Sotheby's" },
  { name: "Christie's" },
  { name: "Phillips" },
]

export const AuctionHouseFilter: React.FC = () => {
  const filterContext = useAuctionResultsFilterContext()

  const toggleSelection = (selected, name) => {
    let organizations = filterContext.filters.organizations.slice()
    if (selected) {
      organizations.push(name)
    } else {
      organizations = organizations.filter(item => item !== name)
    }
    filterContext.setFilter("organizations", organizations)
  }

  return (
    <Toggle label="Auction house" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Box>
          {auctionHouses.map((checkbox, index) => {
            const { name } = checkbox
            const props = {
              key: index,
              onSelect: selected => {
                toggleSelection(selected, name)
              },
              selected: filterContext.filters.organizations.includes(name),
            }
            return <Checkbox {...props}>{name}</Checkbox>
          })}
        </Box>
      </Flex>
    </Toggle>
  )
}
