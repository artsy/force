import {
  Button,
  FilterIcon,
  Flex,
  Row,
  Separator,
  Spacer,
} from "@artsy/palette"
import React from "react"
import { Media } from "v2/Utils/Responsive"
import { AuctionResultsCount } from "./AuctionResultsCount"
import { SortSelect } from "./SortSelect"

const RowContainer: React.FC = ({ children }) => (
  <Flex justifyContent="space-between" alignItems="center" width="100%">
    {children}
  </Flex>
)

// TODO: get count from context instead of passing down artist?
export const AuctionResultsControls = ({ artist, toggleMobileActionSheet }) => {
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
            <SortSelect />
          </RowContainer>
        </Row>
        <Row>
          <AuctionResultsCount results={artist.auctionResultsConnection} />
        </Row>
      </Media>
      <Media greaterThan="xs">
        <Row pb={2}>
          <Separator />
        </Row>
        <RowContainer>
          <AuctionResultsCount results={artist.auctionResultsConnection} />
          <SortSelect />
        </RowContainer>
      </Media>
    </>
  )
}
