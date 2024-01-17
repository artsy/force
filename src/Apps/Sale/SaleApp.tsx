import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SaleApp_sale$data } from "__generated__/SaleApp_sale.graphql"
import { SaleApp_viewer$data } from "__generated__/SaleApp_viewer.graphql"
import {
  Box,
  Flex,
  HTML,
  Message,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { SaleMetaFragmentContainer } from "Apps/Sale/Components/SaleMeta"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { AuctionDetailsStartTimeQueryRenderer } from "Apps/Auction/Components/AuctionDetails/AuctionDetailsStartTime"
import { SaleArtworkFilterRefetchContainer } from "Apps/Sale/Components/SaleArtworks"

export interface SaleAppProps {
  sale: SaleApp_sale$data
  viewer: SaleApp_viewer$data
}

const SaleApp: React.FC<SaleAppProps> = ({ children, sale, viewer }) => {
  return (
    <>
      <SaleMetaFragmentContainer sale={sale} />

      {sale.coverImage?.url ? (
        <>
          <FullBleedHeader src={sale.coverImage.url} />
          <Spacer y={4} />
        </>
      ) : (
        <Spacer y={2} />
      )}

      <Text variant="xl" as="h1">
        {sale.name}
      </Text>
      <Spacer y={4} />
      <Flex alignItems="center" justifyContent="space-between">
        <>
          <AuctionDetailsStartTimeQueryRenderer id={sale.internalID} pr={2} />
          <Spacer y={2} />
        </>
      </Flex>

      <Spacer y={2} />

      <HTML html={sale.description || ""} />

      <Spacer y={4} />

      <Separator />

      <Spacer y={4} />

      {sale.eligibleSaleArtworksCount === 0 ? (
        <>
          <Message variant="default" title="Works will be available soon." />
        </>
      ) : (
        <SaleArtworkFilterRefetchContainer viewer={viewer} />
      )}

      <Box my={2}>{children}</Box>
    </>
  )
}

export const SaleAppFragmentContainer = createFragmentContainer(SaleApp, {
  sale: graphql`
    fragment SaleApp_sale on Sale {
      ...SaleMeta_sale
      coverImage {
        url(version: ["wide", "source", "large_rectangle"])
      }
      description(format: HTML)
      eligibleSaleArtworksCount
      internalID
      name
    }
  `,
  viewer: graphql`
    fragment SaleApp_viewer on Viewer
      @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
      ...SaleArtworksFilter_viewer @arguments(input: $input)
    }
  `,
})
