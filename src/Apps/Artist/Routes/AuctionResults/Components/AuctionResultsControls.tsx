import { Button, FilterIcon, Flex, Spacer } from "@artsy/palette"
import * as React from "react"
import { Media } from "Utils/Responsive"
import { KeywordFilter } from "./KeywordFilter"
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

      <Spacer y={2} />

      <KeywordFilter />
    </Media>
  )
}
