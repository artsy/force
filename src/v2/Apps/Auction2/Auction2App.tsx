import { Box, Join, Spacer, Tab, Tabs } from "@artsy/palette"
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
import { AuctionBuyNowRailFragmentContainer } from "./Components/AuctionBuyNowRail"
import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "./Components/AuctionWorksByFollowedArtistsRail"

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

  const tabBar = {
    isVisible:
      me?.showLotStandingsTab?.length ||
      viewer.showFollowedArtistsTab?.edges?.length ||
      sale.showBuyNowTab,
    showActiveBids: me?.showLotStandingsTab?.length,
    showFollowedArtistsTab: viewer.showFollowedArtistsTab?.edges?.length,
    showBuyNowTab: sale.showBuyNowTab,
  }

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

        {tabBar.isVisible && (
          <Tabs mb={4}>
            {tabBar.showActiveBids && (
              <Tab name="Your Active Bids">
                <AuctionActiveBidsRefetchContainer me={me} />
              </Tab>
            )}
            {tabBar.showFollowedArtistsTab && (
              <Tab name="Works By Artists You Follow">
                <AuctionWorksByFollowedArtistsRailFragmentContainer
                  viewer={viewer}
                />
              </Tab>
            )}
            {tabBar.showBuyNowTab && (
              <Tab name="Buy Now">
                <AuctionBuyNowRailFragmentContainer sale={sale} />
              </Tab>
            )}
          </Tabs>
        )}

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
        @argumentDefinitions(saleID: { type: "String" }) {
        ...AuctionActiveBids_me @arguments(saleID: $saleID)
        ...AuctionDetails_me

        showLotStandingsTab: lotStandings(saleID: $saleID, live: true) {
          activeBid {
            internalID
          }
        }
      }
    `,
    sale: graphql`
      fragment Auction2App_sale on Sale {
        ...Auction2Meta_sale
        ...AuctionBuyNowRail_sale
        ...AuctionDetails_sale

        internalID
        coverImage {
          cropped(width: 1800, height: 600, version: "normalized") {
            src
          }
        }
        showBuyNowTab: promotedSale {
          internalID
        }
      }
    `,
    viewer: graphql`
      fragment Auction2App_viewer on Viewer
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          saleID: { type: "String" }
        ) {
        ...AuctionArtworkFilter_viewer @arguments(input: $input)
        ...AuctionWorksByFollowedArtistsRail_viewer @arguments(saleID: $saleID)

        showFollowedArtistsTab: saleArtworksConnection(
          first: 1
          aggregations: [TOTAL]
          saleSlug: $saleID
          includeArtworksByFollowedArtists: true
        ) {
          edges {
            node {
              internalID
            }
          }
        }
      }
    `,
  }
)
