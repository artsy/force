import { Box, Join, Message, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { AuctionArtworkFilterQueryRenderer } from "Apps/Auction/Components/AuctionArtworkFilter"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { WebsocketContextProvider } from "System/Contexts/WebsocketContext"
import type { AuctionApp_me$data } from "__generated__/AuctionApp_me.graphql"
import type { AuctionApp_sale$data } from "__generated__/AuctionApp_sale.graphql"
import type { AuctionApp_viewer$data } from "__generated__/AuctionApp_viewer.graphql"
import { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionActiveBidsRefetchContainer } from "./Components/AuctionActiveBids"
import { AuctionAssociatedSaleFragmentContainer } from "./Components/AuctionAssociatedSale"
import { AuctionBuyNowRailFragmentContainer } from "./Components/AuctionBuyNowRail"
import { AuctionCurrentAuctionsRailFragmentContainer } from "./Components/AuctionCurrentAuctionsRail"
import { AuctionDetailsFragmentContainer } from "./Components/AuctionDetails/AuctionDetails"
import { AuctionMetaFragmentContainer } from "./Components/AuctionMeta"
import { AuctionWorksByFollowedArtistsRailFragmentContainer } from "./Components/AuctionWorksByFollowedArtistsRail"
import { useAuctionTracking } from "./Hooks/useAuctionTracking"

export interface AuctionAppProps {
  me: AuctionApp_me$data
  sale: AuctionApp_sale$data
  viewer: AuctionApp_viewer$data
}

export const AuctionApp: React.FC<React.PropsWithChildren<AuctionAppProps>> = ({
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

  useEffect(() => {
    tracking.auctionPageView({ sale, me })
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
                    <Tab name="Inquire">
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
                  <Text variant="sm-display" color="mono60">
                    Auction lots will be published soon.
                  </Text>
                </Message>

                <Spacer y={2} />

                <AuctionCurrentAuctionsRailFragmentContainer viewer={viewer} />
              </>
            ) : (
              <AuctionArtworkFilterQueryRenderer />
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
      saleID: { type: "String!" }
      isLoggedIn: { type: "Boolean!" }
    ) {
      ...AuctionWorksByFollowedArtistsRail_viewer
        @arguments(saleID: $saleID)
        @include(if: $isLoggedIn)
      ...AuctionCurrentAuctionsRail_viewer

      showFollowedArtistsTab: saleArtworksConnection(
        first: 1
        aggregations: [TOTAL]
        saleSlug: $saleID
        includeArtworksByFollowedArtists: true
      ) @include(if: $isLoggedIn) {
        edges {
          node {
            internalID
          }
        }
      }
    }
  `,
})
