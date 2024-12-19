import FilterIcon from "@artsy/icons/FilterIcon"
import { Button, Flex } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { SortSelect } from "./SortSelect"

export const AuctionResultsControls = ({ toggleMobileActionSheet }) => {
  return (
    <Media at="xs">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Button
          size="small"
          onClick={() => toggleMobileActionSheet(true)}
          Icon={FilterIcon}
        >
          Filter
        </Button>

        <SortSelect />
      </Flex>
    </Media>
  )
}
