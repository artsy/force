import React from "react"
import { AuctionsApp_viewer } from "v2/__generated__/AuctionsApp_viewer.graphql"
import { AuctionsMeta } from "./Components/AuctionsMeta"
import { MyBidsFragmentContainer } from "./Components/MyBids/MyBids"
import { Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RecentlyViewed } from "v2/Components/RecentlyViewed"
import { RouterLink } from "v2/System/Router/RouterLink"
import { RouteTabs, RouteTab } from "v2/Components/RouteTabs"
import { useSystemContext } from "v2/System/useSystemContext"
import { WorksByArtistsYouFollowRailFragmentContainer } from "./Components/WorksByArtistsYouFollowRail/WorksByArtistsYouFollowRail"
import { ChevronButton } from "v2/Components/ChevronButton"
import { getENV } from "v2/Utils/getENV"

export interface AuctionsAppProps {
  viewer: AuctionsApp_viewer
}

const AuctionsApp: React.FC<AuctionsAppProps> = props => {
  const { children, viewer } = props
  const { user } = useSystemContext()

  // FIXME: Remove once new filter launches
  const enableNewAuctionsFilter = getENV("ENABLE_NEW_AUCTIONS_FILTER")

  return (
    <>
      <AuctionsMeta />

      <GridColumns mt={4}>
        <Column span={6}>
          <Text variant="xl" as="h1">
            Auctions
          </Text>
        </Column>

        <Column span={6}>
          <Text variant="md">
            Bid on works you love with auctions on Artsy. With bidding opening
            daily, Artsy connects collectors like you to art from leading
            auction houses, nonprofit organizations, and sellers across the
            globe. We feature premium artworks including modern, contemporary,
            and street art, so you can find works by your favorite artists—and
            discover new ones—all in one place.
          </Text>
          <RouterLink
            to="https://support.artsy.net/hc/en-us/sections/360008298773-Bid-at-Auction"
            noUnderline
          >
            <ChevronButton>Learn more about bidding on Artsy</ChevronButton>
          </RouterLink>
        </Column>
      </GridColumns>

      {user && (
        <>
          <Spacer mt={6} />

          <Join separator={<Spacer mt={6} />}>
            {viewer.me && <MyBidsFragmentContainer me={viewer.me} />}

            <WorksByArtistsYouFollowRailFragmentContainer viewer={viewer} />
          </Join>
        </>
      )}

      <Spacer mt={6} />

      <RouteTabs fill>
        <RouteTab exact to="/auctions">
          Current Auctions
        </RouteTab>

        <RouteTab to="/auctions/upcoming">Upcoming</RouteTab>

        <RouteTab to="/auctions/past">Past</RouteTab>

        {enableNewAuctionsFilter && (
          <>
            <RouteTab to="/auctions/auctions">Auctions</RouteTab>
            <RouteTab to="/auctions/artworks">Artworks</RouteTab>
          </>
        )}
      </RouteTabs>

      {children}

      <RecentlyViewed />
    </>
  )
}

export const AuctionsAppFragmentContainer = createFragmentContainer(
  AuctionsApp,
  {
    viewer: graphql`
      fragment AuctionsApp_viewer on Viewer {
        ...WorksByArtistsYouFollowRail_viewer

        me {
          ...MyBids_me
        }
      }
    `,
  }
)
