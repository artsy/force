import { Box, Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { AnalyticsContext, useAnalyticsContext } from "v2/System"
import { Auction2App_me } from "v2/__generated__/Auction2App_me.graphql"
import { Auction2App_sale } from "v2/__generated__/Auction2App_sale.graphql"
import { Auction2App_viewer } from "v2/__generated__/Auction2App_viewer.graphql"
import { Auction2MetaFragmentContainer } from "./Components/Auction2Meta"
import { AuctionActiveBidsRefetchContainer } from "./Components/AuctionActiveBids"
import { AuctionArtworkFilterRefetchContainer } from "./Components/AuctionArtworkFilter"
import { AuctionDetailsFragmentContainer } from "./Components/AuctionDetails/AuctionDetails"
import { AuctionPromotedSaleRailFragmentContainer } from "./Components/AuctionPromotedSaleRail"

/**
 * TODO:
 * - Re-add ZenDesk
 */

export interface Auction2AppProps {
  me: Auction2App_me
  sale: Auction2App_sale
  viewer: Auction2App_viewer
}

export const Auction2App: React.FC<Auction2AppProps> = ({
  children,
  me,
  sale,
  viewer,
}) => {
  const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: sale.internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <Auction2MetaFragmentContainer sale={sale} />

      <Join separator={<Spacer my={4} />}>
        {sale.coverImage?.cropped && (
          <FullBleedHeader src={sale.coverImage.cropped.src} />
        )}

        <AuctionDetailsFragmentContainer sale={sale} me={me} />

        <AuctionActiveBidsRefetchContainer me={me} />

        <AuctionPromotedSaleRailFragmentContainer sale={sale} />

        <AuctionArtworkFilterRefetchContainer viewer={viewer} />

        <Box>{children}</Box>
      </Join>
    </AnalyticsContext.Provider>
  )
}

export const Auction2AppFragmentContainer = createFragmentContainer(
  Auction2App,
  {
    me: graphql`
      fragment Auction2App_me on Me
        @argumentDefinitions(saleID: { type: "String!" }) {
        ...AuctionDetails_me
        ...AuctionActiveBids_me @arguments(saleID: $saleID)
      }
    `,
    sale: graphql`
      fragment Auction2App_sale on Sale {
        ...Auction2Meta_sale
        ...AuctionPromotedSaleRail_sale
        ...AuctionDetails_sale

        internalID
        coverImage {
          cropped(width: 1800, height: 600, version: "wide") {
            src
          }
        }
      }
    `,
    viewer: graphql`
      fragment Auction2App_viewer on Viewer
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        ...AuctionArtworkFilter_viewer @arguments(input: $input)
      }
    `,
  }
)
