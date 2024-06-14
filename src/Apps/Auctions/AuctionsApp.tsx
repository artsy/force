import * as React from "react"
import { AuctionsApp_viewer$data } from "__generated__/AuctionsApp_viewer.graphql"
import { AuctionsMeta } from "./Components/AuctionsMeta"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RecentlyViewed } from "Components/RecentlyViewed"
import { RouterLink } from "System/Components/RouterLink"
import { RouteTabs, RouteTab } from "Components/RouteTabs"
import { getENV } from "Utils/getENV"
import { CuritorialRailsTabBarFragmentContainer } from "./Components/CuritorialRailsTabBar"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { MyBidsQueryRenderer } from "Apps/Auctions/Components/MyBids/MyBids"

export interface AuctionsAppProps {
  viewer: AuctionsApp_viewer$data
}

const AuctionsApp: React.FC<AuctionsAppProps> = props => {
  const { children, viewer } = props

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
          <Text variant="sm">
            Bid on works you love with auctions on Artsy. With bidding opening
            daily, Artsy connects collectors like you to art from leading
            auction houses, nonprofit organizations, and sellers across the
            globe. We feature premium artworks including modern, contemporary,
            and street art, so you can find works by your favorite artists—and
            discover new ones—all in one place.
          </Text>

          <Spacer y={2} />

          <RouterLink
            to="https://support.artsy.net/s/article/How-do-I-place-a-bid-in-an-auction"
            textDecoration="none"
            display="flex"
            alignItems="center"
          >
            Learn more about bidding on Artsy
            <ChevronRightIcon ml={0.5} height={15} width={15} />
          </RouterLink>
        </Column>
      </GridColumns>

      <Spacer y={4} />

      <MyBidsQueryRenderer mb={12} />

      <CuritorialRailsTabBarFragmentContainer viewer={viewer} />

      <Spacer y={12} />

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
        ...CuritorialRailsTabBar_viewer
      }
    `,
  }
)
