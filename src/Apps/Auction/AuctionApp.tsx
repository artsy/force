import { Box, Join, Message, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { AuctionApp_me$data } from "__generated__/AuctionApp_me.graphql"
import { AuctionApp_sale$data } from "__generated__/AuctionApp_sale.graphql"
import { AuctionApp_viewer$data } from "__generated__/AuctionApp_viewer.graphql"
import { AuctionMetaFragmentContainer } from "./Components/AuctionMeta"
import { AuctionActiveBidsRefetchContainer } from "./Components/AuctionActiveBids"
import { AuctionArtworkFilterRefetchContainer } from "./Components/AuctionArtworkFilter"
import { AuctionDetailsFragmentContainer } from "./Components/AuctionDetails/AuctionDetails"
import { AuctionBuyNowRailFragmentContainer } from "./Components/AuctionBuyNowRail"
import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "./Components/AuctionWorksByFollowedArtistsRail"
import { AuctionAssociatedSaleFragmentContainer } from "./Components/AuctionAssociatedSale"
import { useEffect } from "react"
import { useAuctionTracking } from "./Hooks/useAuctionTracking"
import { AuctionCurrentAuctionsRailFragmentContainer } from "./Components/AuctionCurrentAuctionsRail"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"
import { WebsocketContextProvider } from "System/Contexts/WebsocketContext"

export interface AuctionAppProps {
  me: AuctionApp_me$data
  sale: AuctionApp_sale$data
  viewer: AuctionApp_viewer$data
}

export const AuctionApp: React.FC<AuctionAppProps> = ({
  children,
  me,
  sale,
  viewer,
}) => {
  const { tracking } = useAuctionTracking()

  const showActiveBids = me?.showActiveBids?.length && !sale.isClosed

  const tabBar = {
    isVisible:
      sale.showAssociatedSale ||
      showActiveBids ||
      viewer.showFollowedArtistsTab?.edges?.length ||
      sale.showBuyNowTab,
    showAssociatedSale: sale.showAssociatedSale,
    showActiveBids: showActiveBids,
    showFollowedArtistsTab: viewer.showFollowedArtistsTab?.edges?.length,
    showBuyNowTab: sale.showBuyNowTab,
  }

  const {
    cascadingEndTimeIntervalMinutes,
    extendedBiddingIntervalMinutes,
    internalID,
  } = sale

  const isFullBleedHeaderFixed = !cascadingEndTimeIntervalMinutes

  // Track page view
  useEffect(() => {
    tracking.auctionPageView({ sale, me })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const websocketEnabled = !!extendedBiddingIntervalMinutes

  return (
    <>
      <Analytics contextPageOwnerId={sale.internalID}>
        <WebsocketContextProvider
          channelInfo={{
            channel: "SalesChannel",
            sale_id: internalID,
          }}
          enabled={websocketEnabled}
        >
          <CascadingEndTimesBannerFragmentContainer sale={sale} />

          <AuctionMetaFragmentContainer sale={sale} />

          <Join separator={<Spacer y={4} />}>
            {sale.coverImage?.url ? (
              <FullBleedHeader
                fixed={isFullBleedHeaderFixed}
                src={sale.coverImage.url}
              />
            ) : (
              <Spacer y={2} />
            )}

            <AuctionDetailsFragmentContainer sale={sale} me={me} />

            {tabBar.isVisible && (
              // `key` is being passed to `Tabs` to ensure re-render
              // Join is messing with `key` at this level; so `Tabs` are wrapped in a `Box`
              // https://github.com/artsy/palette/pull/1144
              <Box>
                <Tabs key={sale.internalID} mb={4}>
                  {tabBar.showAssociatedSale && (
                    <Tab name="Associated Sale">
                      <AuctionAssociatedSaleFragmentContainer sale={sale} />
                    </Tab>
                  )}
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
              </Box>
            )}

            {sale.status === "preview" &&
            sale.eligibleSaleArtworksCount === 0 ? (
              <>
                <Message
                  variant="default"
                  title="Registration for this auction is currently open"
                >
                  <Text variant="sm-display" color="black60">
                    Auction lots will be published soon.
                  </Text>
                </Message>

                <Spacer y={2} />

                <AuctionCurrentAuctionsRailFragmentContainer viewer={viewer} />
              </>
            ) : (
              <AuctionArtworkFilterRefetchContainer viewer={viewer} />
            )}

            <Box>{children}</Box>
          </Join>
        </WebsocketContextProvider>
      </Analytics>
    </>
  )
}

export const AuctionAppFragmentContainer = createFragmentContainer(AuctionApp, {
  me: graphql`
    fragment AuctionApp_me on Me
      @argumentDefinitions(saleID: { type: "String" }) {
      ...AuctionActiveBids_me @arguments(saleID: $saleID)
      ...AuctionDetails_me
      internalID
      showActiveBids: lotStandings(saleID: $saleID, live: true) {
        activeBid {
          internalID
        }
      }
    }
  `,
  sale: graphql`
    fragment AuctionApp_sale on Sale {
      ...AuctionMeta_sale
      ...AuctionAssociatedSale_sale
      ...AuctionBuyNowRail_sale
      ...AuctionDetails_sale
      ...CascadingEndTimesBanner_sale
      internalID
      slug
      isClosed
      eligibleSaleArtworksCount
      coverImage {
        url(version: ["wide", "source", "large_rectangle"])
      }
      showAssociatedSale: associatedSale {
        internalID
      }
      showBuyNowTab: promotedSale {
        internalID
      }
      cascadingEndTimeIntervalMinutes
      extendedBiddingIntervalMinutes
      status
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
      ...AuctionCurrentAuctionsRail_viewer

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
