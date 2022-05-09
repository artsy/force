import { Box, Join, Message, Spacer, Tab, Tabs, Text } from "@artsy/palette"
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
import { AuctionAssociatedSaleFragmentContainer } from "./Components/AuctionAssociatedSale"
import { CascadingEndTimesBanner } from "./Components/AuctionDetails/CascadingEndTimesBanner"
import { useEffect } from "react"
import { useAuctionTracking } from "./Hooks/useAuctionTracking"
import { AuctionCurrentAuctionsRailFragmentContainer } from "./Components/AuctionCurrentAuctionsRail"

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
  } = sale

  const isFullBleedHeaderFixed = !cascadingEndTimeIntervalMinutes

  // Track page view
  useEffect(() => {
    tracking.auctionPageView({ sale, me })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: sale.internalID,
          contextPageOwnerSlug,
          contextPageOwnerType,
        }}
      >
        {cascadingEndTimeIntervalMinutes && (
          <CascadingEndTimesBanner
            cascadingEndTimeIntervalMinutes={cascadingEndTimeIntervalMinutes}
            extendedBiddingIntervalMinutes={extendedBiddingIntervalMinutes}
          />
        )}

        <AuctionMetaFragmentContainer sale={sale} />

        <Join separator={<Spacer my={4} />}>
          {sale.coverImage?.url ? (
            <FullBleedHeader
              fixed={isFullBleedHeaderFixed}
              src={sale.coverImage.url}
            />
          ) : (
            <Spacer my={2} />
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

          {sale.status === "preview" && sale.eligibleSaleArtworksCount === 0 ? (
            <>
              <Message
                variant="default"
                title="Registration for this auction is currently open"
              >
                <Text variant="md" color="black60">
                  Auction lots will be published soon.
                </Text>
              </Message>

              <Spacer my={2} />

              <AuctionCurrentAuctionsRailFragmentContainer viewer={viewer} />
            </>
          ) : (
            <AuctionArtworkFilterRefetchContainer viewer={viewer} />
          )}

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
