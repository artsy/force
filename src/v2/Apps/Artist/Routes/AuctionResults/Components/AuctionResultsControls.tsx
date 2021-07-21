import { Button, FilterIcon, Flex, Row, Spacer } from "@artsy/palette"
import React from "react"
import { Media } from "v2/Utils/Responsive"
import { KeywordFilter } from "./KeywordFilter"
import { SortSelect } from "./SortSelect"

const RowContainer: React.FC = ({ children }) => (
  <Flex justifyContent="space-between" alignItems="center" width="100%">
    {children}
  </Flex>
)

export const AuctionResultsControls = ({ toggleMobileActionSheet }) => {
  return (
    <>
      <Media at="xs">
        <Row pb={2}>
          <RowContainer>
            <Button size="small" onClick={() => toggleMobileActionSheet(true)}>
              <Flex justifyContent="space-between" alignItems="center">
                <FilterIcon fill="white100" />
                <Spacer mr={0.5} />
                Filter
              </Flex>
            </Button>
            <Flex ml={1}>
              <SortSelect />
            </Flex>
          </RowContainer>
        </Row>
        <KeywordFilter />
      </Media>
    </>
  )
}
