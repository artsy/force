import { Box, Join, Spacer, Tab, Tabs } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { AnalyticsContext, useAnalyticsContext } from "v2/System"
import { AuctionApp_me } from "v2/__generated__/AuctionApp_me.graphql"
import { AuctionApp_sale } from "v2/__generated__/AuctionApp_sale.graphql"
import { AuctionApp_viewer } from "v2/__generated__/AuctionApp_viewer.graphql"
import { AuctionMetaFragmentContainer } from "./Components/AuctionMeta"
import { AuctionActiveBidsRefetchContainer } from "./Components/AuctionActiveBids"
import { AuctionArtworkFilterRefetchContainer } from "./Components/AuctionArtworkFilter"
import { AuctionDetailsFragmentContainer } from "./Components/AuctionDetails/AuctionDetails"
import { AuctionBuyNowRailFragmentContainer } from "./Components/AuctionBuyNowRail"
import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "./Components/AuctionWorksByFollowedArtistsRail"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"
import { getENV } from "v2/Utils/getENV"

export interface AuctionAppProps {
  me: AuctionApp_me
  sale: AuctionApp_sale
  viewer: AuctionApp_viewer
}

export const AuctionApp: React.FC<AuctionAppProps> = ({
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
    <>
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: sale.internalID,
          contextPageOwnerSlug,
          contextPageOwnerType,
        }}
      >
        <AuctionMetaFragmentContainer sale={sale} />

        <Join separator={<Spacer my={4} />}>
          {sale.coverImage?.url ? (
            <FullBleedHeader src={sale.coverImage.url} />
          ) : (
            <Spacer my={2} />
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

      <ZendeskWrapper zdKey={getENV("AUCTION_ZENDESK_KEY")} />
    </>
  )
}

export const AuctionAppFragmentContainer = createFragmentContainer(AuctionApp, {
  me: graphql`
    fragment AuctionApp_me on Me
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
    fragment AuctionApp_sale on Sale {
      ...AuctionMeta_sale
      ...AuctionBuyNowRail_sale
      ...AuctionDetails_sale

      internalID
      coverImage {
        url(version: ["wide", "source", "large_rectangle"])
      }
      showBuyNowTab: promotedSale {
        internalID
      }
    }
  `,
  viewer: graphql`
    fragment AuctionApp_viewer on Viewer
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
})
